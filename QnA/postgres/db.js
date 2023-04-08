const pgPromise = require('pg-promise')();
require("dotenv").config();

const pw = process.env.POSTGRESSPW


const db = pgPromise({
  // user: 'Markus',
  // host: 'localhost',
  // database: 'qna'
  user: 'qnauser',
  host: 'localhost',
  database: 'qna',
  port: 5432,
  password: pw,
})

module.exports = db;


