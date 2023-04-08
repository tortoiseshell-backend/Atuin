const fs = require('fs')
const db = require('../db.js')
const key_setup = require('../key_setup.js')

const blankdb = fs.readFileSync('./QnA/postgres/PostgresModel.sql').toString();

const start = Date.now()
console.log('starting the db from fresh now')
db.none(blankdb)
.then(() => {
  console.log('db blanking finished')
  return Promise.all([
    db.none(`COPY questions FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/questions.csv' CSV HEADER`),
    db.none(`COPY answers FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/answers.csv' CSV HEADER`),
    db.none(`COPY answers_photos FROM '/Users/Markus/Desktop/Hack_Reactor/SDC/Miriel/QnA/SourceData/answers_photos.csv' CSV HEADER`)])

})
.then(() => {
  key_setup(start)
})