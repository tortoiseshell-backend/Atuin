require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const controllers = require("./controllers.js");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/products', controllers.products);
app.get('/api/products/:product_id', controllers.product);
app.get('/api/products/:product_id/styles', controllers.styles);
app.get('/api/products/:product_id/related', controllers.related);
app.get('/api/cart', controllers.getCart);
app.post('/api/cart', controllers.postCart);
app.get('/loaderio-eb23194a4feb4d296c9d78529d42f818', (req, res) =>
  res.send('loaderio-eb23194a4feb4d296c9d78529d42f818'));

const PORT = process.env.DB_PORT || 3034;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);