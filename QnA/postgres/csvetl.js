const fs = require('fs')
const db = require('./db.js')

const blankdb = fs.readFileSync('./QnA/postgres/PostgresModel.sql').toString();

const start = Date.now()
db.none(blankdb).then(() => (
  Promise.all([db.none(`COPY questions FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/questions.csv' CSV HEADER`),
  db.none(`COPY answers FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/answers.csv' CSV HEADER`),
  db.none(`COPY answers_photos FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/answers_photos.csv' CSV HEADER`)])
)).then(() => ( // Add foreign key constraints
  db.none(`ALTER TABLE answers ADD CONSTRAINT quest FOREIGN KEY (question_id) REFERENCES questions (id);`)
)).then(() => (
  db.none(`ALTER TABLE answers_photos ADD CONSTRAINT ans FOREIGN KEY (answer_id) REFERENCES answers (id);`)
))
.then(() => {
  db.none(`CREATE INDEX questionIndex on answers (question_id);`)
  db.none(`CREATE INDEX prodIndex on questions (product_id);`)
  db.none(`CREATE INDEX answerIndex on answers_photos (answer_id);`)
})
.then(() => {
  console.log('process complete', (Date.now()-start) + ' ms taken')
})

