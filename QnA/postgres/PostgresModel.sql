
-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS Answers_Photos;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;

CREATE UNLOGGED TABLE Questions (
  id SERIAL,
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

CREATE UNLOGGED TABLE Answers (
  id SERIAL,
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

CREATE UNLOGGED TABLE Answers_Photos (
  id SERIAL,
  answer_id INTEGER, -- REFERENCES Answers (id),
  url VARCHAR(150)
)
