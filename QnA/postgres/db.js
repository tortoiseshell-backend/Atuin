const pgPromise = require('pg-promise')();

const pw = process.env.POSTGRESSPW


const db = pgPromise({
  user: 'Markus',
  host: 'localhost',
  database: 'qna',
  port: 5432,
})

module.exports = db;