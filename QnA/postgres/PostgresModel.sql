
-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS Answers_Photos;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL,
  body VARCHAR(1000) NOT NULL DEFAULT '',
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL DEFAULT '', --name of the asker
  asker_email VARCHAR(50) NOT NULL DEFAULT '',
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NULL DEFAULT '0'
);

-- ---
-- Table 'Answers'
-- Answers to a given question
-- ---

CREATE TABLE Answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER, -- REFERENCES Questions (id), moved referencing elsewhere to paralelize load
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL DEFAULT '', --name of the answerer
  answerer_email VARCHAR(50) NOT NULL DEFAULT '',
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness INTEGER NULL DEFAULT '0'
);

-- ---
-- Table 'Answers_Photos'
-- Photos for a given answer
-- ---

CREATE TABLE Answers_Photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER, -- REFERENCES Answers (id),
  url VARCHAR(150)
)
