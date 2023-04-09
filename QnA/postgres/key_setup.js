const fs = require('fs')
const db = require('./db.js')

setup = (start) => {
  console.log('beginning key promises')
  Promise.all([
    db.none(`ALTER TABLE questions ADD PRIMARY KEY (id);`),
    db.none(`ALTER TABLE answers ADD PRIMARY KEY (id);`),
    db.none(`ALTER TABLE answers_photos ADD PRIMARY KEY (id);`)])
  .then(() => { // Add foreign key constraints
    console.log('primary keys added')
    return db.none(`ALTER TABLE answers ADD CONSTRAINT quest FOREIGN KEY (question_id) REFERENCES questions (id);`)
    }).then(() => {
    return db.none(`ALTER TABLE answers_photos ADD CONSTRAINT ans FOREIGN KEY (answer_id) REFERENCES answers (id);`)
    })
  .then(() => {
    // index the foreign keys for speed
    db.none(`CREATE INDEX questionIndex on answers USING HASH (question_id);`)
    db.none(`CREATE INDEX prodIndex on questions USING HASH (product_id);`)
    db.none(`CREATE INDEX answerIndex on answers_photos USING HASH (answer_id);`)
    // set the ids to be correct
    db.any(`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions)+1);`)
    db.any(`SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers)+1);`)
    db.any(`SELECT setval('answers_photos_id_seq', (SELECT MAX(id) FROM answers_photos)+1);`)
  })
  .then(() => {
    console.log('process complete', (Date.now()-start) + ' ms taken')
  })
}

module.exports = setup;