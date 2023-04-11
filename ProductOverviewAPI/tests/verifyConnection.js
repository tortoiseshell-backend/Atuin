const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.PRODUCTS_DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to Postgres database', err);
  } else {
    console.log('Connected to Postgres database at', res.rows[0].now);
  }
});
