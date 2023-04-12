require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  host: 'ec2-18-188-148-36.us-east-2.compute.amazonaws.com',
  database: 'products',
  password: 'password',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to Postgres database', err);
  } else {
    console.log('Connected to Postgres database at', res.rows[0].now);
  }
});
