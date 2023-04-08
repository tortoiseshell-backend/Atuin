
const pgPromise = require('pg-promise')();

const db = pgPromise({
  connectionString: 'postgres://jake_windows_11:password@localhost:5432/products',
});

db.query('SELECT * FROM products.products LIMIT 10')
  .then(data => console.log(data))
  .catch(error => console.error(error));