// db.js
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 5000,
});

module.exports = db;
