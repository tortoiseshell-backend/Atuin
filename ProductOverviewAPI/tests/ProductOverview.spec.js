require("dotenv").config();
const axios = require(`axios`);

test(`get products`, async () => {
  const results = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/products?page=1&count=5`)
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test(`get a product`, async () => {
  const results = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/products/5000`)
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test(`get styles for a product`, async () => {
  const results = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/products/5000/styles`)
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});

test(`get related products for a product`, async () => {
  const results = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/products/5000/related`)
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test(`get cart`, async () => {
  const results = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/cart?user=1234`)
  // console.log(JSON.stringify(results.data, null, 2))
  expect(results.status).toEqual(200);
});

test(`post to cart`, async () => {
  // Get the initial cart
  const initialCart = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/cart?user=1234`);
  // console.log(initialCart.data)

  // Add a new item to the cart
  const addToCart = await axios.post(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/cart?user=1234&sku_Id=2`);

  // Get the updated cart
  const updatedCart = await axios.get(`http://${process.env.MY_IP}:${process.env.DB_PORT}/api/cart?user=1234`);
  // console.log(updatedCart.data)

  // Check that the status codes are correct
  expect(initialCart.status).toEqual(200);
  expect(addToCart.status).toEqual(201);
  expect(updatedCart.status).toEqual(200);

  // Check that the count of the specified SKU in the cart has increased by one
  const initialCount = initialCart.data.find(item => item.sku_id === 2)?.count || 0;
  const updatedCount = updatedCart.data.find(item => item.sku_id === 2)?.count || 0;
  expect(updatedCount).toEqual(initialCount + 1);
});