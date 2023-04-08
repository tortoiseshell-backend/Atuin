require("dotenv").config();
const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");

const app = express();
app.use(express.json());


app.get('/api/products', controllers.products);
app.get('/api/products/:product_id', controllers.product)
app.get('/api/products/:product_id/styles', controllers.styles)
app.get('/api/products/:product_id/related', controllers.related)
const PORT = process.env.PORT || 3014;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);