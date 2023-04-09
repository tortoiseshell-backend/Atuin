const axios = require('axios');

test('get products', async () => {
  const results = await axios.get('http://localhost:3034/api/products?page=1&count=5')
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test('get a product', async () => {
  const results = await axios.get('http://localhost:3034/api/products/5000')
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test('get styles for a product', async () => {
  const results = await axios.get('http://localhost:3034/api/products/5000/styles')
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});

test('get related products for a product', async () => {
  const results = await axios.get('http://localhost:3034/api/products/5000/related')
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test('get cart', async () => {
  const results = await axios.get('http://localhost:3034/api/cart?user=1234')
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});

test('get cart with multiple', async () => {
  const results = await axios.get('http://localhost:3034/api/cart?user=1234')
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});

test('post to cart', async () => {
  const results = await axios.post('http://localhost:3034/api/cart?user=1234&sku_Id=1')
  // console.log(results.status)
  expect(results.status).toEqual(201);
});

test('get cart', async () => {
  const results = await axios.get('http://localhost:3034/api/cart?user=1234')
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});