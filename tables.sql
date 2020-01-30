CREATE TABLE IF NOT EXISTS player (
  id SERIAL PRIMARY KEY,
  name TEXT,
  token TEXT,
  game_id INT
);

CREATE TABLE IF NOT EXISTS game (
  id SERIAL PRIMARY KEY,
  name TEXT,
  number_of_questions INT,
  active_question INT,
  game_state TEXT
);

CREATE TABLE IF NOT EXISTS question (
  id SERIAL PRIMARY KEY,
  question TEXT,
  answer_1 TEXT,
  answer_2 TEXT,
  answer_3 TEXT,
  answer_4 TEXT
);

CREATE TABLE IF NOT EXISTS game_questions (
  id SERIAL PRIMARY KEY,
  question_id INT,
  game_id INT,
  ordering INT
);

CREATE TABLE IF NOT EXISTS game_player_questions (
  id SERIAL PRIMARY KEY,
  player_id INT,
  game_questions_id INT,
  player_answer INT
);
