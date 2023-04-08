import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  duration: '0.5m',
  vus: 2
}

export default function () {
  let res = http.get(`http://ec2-3-84-13-70.compute-1.amazonaws.com/api/qa/questions?product_id=${Math.ceil(Math.random() * 1000011)}`, {
    tags: { name: 'PostsQuestionURL' },
  });
  sleep(0.1)
  check(res, {'is status 200': (r) => (r.status === 200) })
}