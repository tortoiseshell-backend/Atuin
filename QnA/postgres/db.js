const pgPromise = require('pg-promise')();
require("dotenv").config();

const pw = process.env.POSTGRESSPW


const db = pgPromise({
  user: 'Markus',
  host: 'localhost',
  database: 'qna'
  // user: 'qnauser',
  // host: 'ec2-54-209-182-101.compute-1.amazonaws.com',
  // database: 'qna',
  // port: 5432,
  // password: pw,
})

module.exports = db;


