require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to Postgres database', err);
  } else {
    console.log('Connected to Postgres database at', res.rows[0].now);

    pool.query(`
      SELECT json_build_object(
        'id', p.id,
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'default_price', p.default_price,
        'features', (
          SELECT json_agg(json_build_object(
            'feature', f.feature,
            'value', NULLIF(f.value, 'null')
          )) as features
          FROM products.features f
          WHERE f.product_id = p.id
        )
      ) as product
      FROM products.products p
      WHERE p.id BETWEEN $1 AND $2
    `, [1, 10], (err, res) => {
      if (err) {
        console.error('Error querying Postgres database', err);
      } else {
        console.log(res.rows);
      }
    });
  }
});