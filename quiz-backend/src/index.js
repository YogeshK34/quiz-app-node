import { questions } from "../question.js";
import { pool } from "./db.js";
import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT NOW()'
        );

        res.status(200).json({ message: result.rows[0] })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
})

app.post('/add-questions', async (req, res) => {
    try {
        for (const q of questions) {
            await pool.query(
                `INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer]
            );
        };
        console.log('Script ran, Questions seeded!');

        res.status(200).json({ message: 'Script ran, Questions seeded!' })
        pool.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
})

app.post('/submit', async (req, res) => {
    try {
        const { username, score } = req.body;
        if (!username || score == undefined || score == null) {
            return res.status(400).json({ error: 'Username & score are required!' })
        };

        await pool.query(
            ` INSERT INTO scoreboard(username, score) VALUES($1, $2)
              ON CONFLICT(username)
              DO UPDATE SET score = GREATEST(scoreboard.score, $2)`,
            [username, score]
        );

        return res.status(200).json({ message: `Score for ${username} recorded` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
})

app.get('/rankings', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT username, score
            RANK() OVER (ORDER BY score DESC) as rank
            FROM scoreboard
            ORDER BY score DESC`
        );

        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
})

app.listen(PORT, () => {
    console.log('Express started!');
});
