// db.js
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: DB_PORT
});

module.exports = db;
