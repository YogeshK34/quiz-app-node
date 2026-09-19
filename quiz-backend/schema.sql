-- have to write only 2 tables : scoreboard & questions
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY, 
    question VARCHAR(255) UNIQUE NOT NULL, 
    option_a VARCHAR(255) NOT NULL, 
    option_b VARCHAR(255) NOT NULL, 
    option_c VARCHAR(255) NOT NULL, 
    option_d VARCHAR(255) NOT NULL, 
    correct_answer VARCHAR(255) NOT NULL
);

-- scoreboard db 
CREATE TABLE IF NOT EXISTS scoreboard (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) UNIQUE NOT NULL, 
    score INT NOT NULL
)