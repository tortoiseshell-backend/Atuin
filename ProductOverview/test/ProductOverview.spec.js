const axios = require('axios');

test('get products', async () => {
  const results = await axios.get('http://localhost:3034/api/products?page=1&count=5')
  console.log(results.data)
  expect(results.status).toEqual(200);
});

test('get a product', async () => {
  const results = await axios.get('http://localhost:3034/api/products/5')
  console.log(results.data)
  expect(results.status).toEqual(200);
});

// test('get styles for a product', async () => {
//   const results = await axios.get('http://localhost:3034/api/products/5/styles')
//   console.log(results.data)
//   expect(results.status).toEqual(200);
// });

// test('get related products for a product', async () => {
//   const results = await axios.get('http://localhost:3034/api/products/5/related')
//   console.log(results.data)
//   expect(results.status).toEqual(200);
// });