INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('1 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('2 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('3 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('4 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('5 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('6 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('7 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('8 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('9 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO question
(question, answer_1, answer_2, answer_3, answer_4)
VALUES
('10 - A is the correct answer', 'A', 'B', 'C', 'D');

INSERT INTO player
(name, token, game_id)
VALUES
('testPlayer', 'aaaaa', 1);

INSERT INTO game
(name, number_of_questions, active_question)
VALUES
('testGame', 10, 1);

INSERT INTO game_questions
(question_id, game_id, ordering)
VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7),
(1, 8, 8),
(1, 9, 9),
(1, 10, 10);
