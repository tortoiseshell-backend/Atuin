const axios = require('axios');

test('get questions for a product', async () => {
  const results = await axios.get('http://localhost:3000/api/qa/questions?product_id=15')
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test('get answers for a product', async () => {
  const results = await axios.get('http://localhost:3000/api/qa/questions/1/answers')
  // console.log(results.data)
  expect(results.status).toEqual(200);
});

test('post a question for a product', async () => {
  const results = await axios.post('http://localhost:3000/api/qa/questions', {"body":"asdf", "name":"asdf", "email":"yeet@bork.yo", "product_id":40345})
  // console.log(results.data)
  expect(results.status).toEqual(201);
});

test('post an answer to a question', async () => {
  const results = await axios.post('http://localhost:3000/api/qa/questions/644932/answers', {"body":"asdf", "name":"asdf", "email":"yeet@bork.yo", "photos":["google.com"]})
  // console.log(results.data)
  expect(results.status).toEqual(201);
});

test('mark a question helpful', async () => {
  const results = await axios.put('http://localhost:3000/api/qa/questions/64/helpful')
  // console.log(results.data)
  expect(results.status).toEqual(204);
});

test('report a question', async () => {
  const results = await axios.put('http://localhost:3000/api/qa/questions/64/report')
  // console.log(results.data)
  expect(results.status).toEqual(204);
});

test('mark an answer helpful', async () => {
  const results = await axios.put('http://localhost:3000/api/qa/answers/128/helpful')
  // console.log(results.data)
  expect(results.status).toEqual(204);
});

test('report an answer', async () => {
  const results = await axios.put('http://localhost:3000/api/qa/answers/128/report')
  // console.log(results.data)
  expect(results.status).toEqual(204);
});