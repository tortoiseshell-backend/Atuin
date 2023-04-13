// db.js
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  user: 'ubuntu',
  host: 'ec2-18-219-72-33.us-east-2.compute.amazonaws.com',
  database: 'products',
  password: 'password',
  port: 5432
});

module.exports = db;
