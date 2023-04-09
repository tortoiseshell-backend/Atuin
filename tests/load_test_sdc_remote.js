import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  duration: '10m',
  vus: 50
}

const arrayForBatch = (n) => ({
  method:'GET',
  url: `http://ec2-3-84-13-70.compute-1.amazonaws.com/api/qa/questions?product_id=${Math.ceil(Math.random() * 1000011)}`,
  params:{
    tags:{
      name: `PostsQuestionURL${n}`
    }
  }
})

const makeBatch = (n) => (
  Array(n).keys().map((k, v) => (
    arrayForBatch(k)
  )))

export default function () {

  let res = http.batch(makeBatch(
    3 // add Math.round(Math.random()) + to make a fractional request volume
    ))
  res.forEach((response) => {
    check(response, {'is status 200': (r) => (r.status === 200) })
  })
}
