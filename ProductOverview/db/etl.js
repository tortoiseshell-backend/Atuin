// etl.js
const fs = require('fs')
const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  connectionString: process.env.PRODUCTS_DATABASE_URL,
});

// const blankdb = fs.readFileSync('ProductOverview/db/ProductsModel.sql').toString();
const start = Date.now();
db.none(`COPY products.products (id, name, slogan, description, category, default_price) FROM '/home/jake_windows_11/SDC/Miriel/csv/product.csv' CSV HEADER`)
  .then(() => {
    return db.none(`COPY products.features (id, product_id, feature, value) FROM '/home/jake_windows_11/SDC/Miriel/csv/features.csv' CSV HEADER`);
  })
  .then(() => {
    return db.none(`COPY products.related (id, product_id, related_product_id) FROM '/home/jake_windows_11/SDC/Miriel/csv/related.csv' CSV HEADER`);
  })
  .then(() => {
    return db.none(`COPY products.styles (id, product_id, name, sale_price, original_price, default_style) FROM '/home/jake_windows_11/SDC/Miriel/csv/styles.csv' CSV HEADER NULL 'null' DELIMITER ',' QUOTE '"'`);
  })
  .then(() => {
    return db.none(`COPY products.skus (id, style_id, size, quantity) FROM '/home/jake_windows_11/SDC/Miriel/csv/skus.csv' CSV HEADER`);
  })
  .then(() => {
    return db.none(`COPY products.photos (id, style_id, thumbnail_url, url) FROM '/home/jake_windows_11/SDC/Miriel/csv/photos.csv' CSV HEADER`);
  })
  .then(() => {
    return db.none(`COPY products.cart (id, user_session, sku_id, active) FROM '/home/jake_windows_11/SDC/Miriel/csv/cart.csv' CSV HEADER`)
  })
  .then(() => {
    // Restarting the id_seq for all tables
    return db.query(`
    SELECT setval('products.cart_id_seq', (SELECT MAX(id) FROM products.cart));
    `);
  })
  .then(() => {
    console.log('process complete', (Date.now() - start) + ' ms taken');
    pgPromise.end();
  })
  .catch(error => console.error(error));

