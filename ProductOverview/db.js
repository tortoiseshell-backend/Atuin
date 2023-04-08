// db.js
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  connectionString: process.env.PRODUCTS_DATABASE_URL,
});

module.exports = db;
