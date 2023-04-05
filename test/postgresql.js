const { Pool } = require('pg')
const pw = process.env.POSTGRESSPW


const pool = new Pool({
  user: 'qnauser',
  host: 'localhost',
  database: 'api',
  password: pw,
  port: 5432,
})