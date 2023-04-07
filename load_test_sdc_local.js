import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  duration: '5m',
  vus: 50
}

export default function () {
  let res = http.get(`http://localhost:3000/api/qa/questions?product_id=${Math.ceil(Math.random() * 1000011)}`, {
    tags: { name: 'PostsQuestionURL' },
  });
  check(res, {'is status 200': (r) => (r.status === 200) })
}