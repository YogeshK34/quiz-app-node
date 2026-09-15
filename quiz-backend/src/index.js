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
        const query = await pool.query(
            'INSERT INTO questions (question, option_a, option_b, k)'
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
})


app.listen(PORT, () => {
    console.log('Express started!');
});
