import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  duration: '1m',
  vus: 50
}

const arrayForBatch = (n) => ({
  method:'GET',
  url: `http://localhost:3000/api/qa/questions?product_id=${Math.ceil(Math.random() * 1000011)}`,
  params:{
    tags:{
      name: `PostsQuestionURL${n}`
    }
  }
})

const makeBatch = (n) => (
  [...Array(n).keys()].map((k, v) => (
    arrayForBatch(k)
  )))

export default function () {

  let res = http.batch(makeBatch(
    1 //Math.round(Math.random()) +
    ))
  res.forEach((response) => {
    check(response, {'is status 200': (r) => (r.status === 200) })
  })
}
