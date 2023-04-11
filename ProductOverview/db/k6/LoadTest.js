import http from 'k6/http';
import { sleep, check } from 'k6';
import productIds from './seedSmall.js';

export const options = {
  vus: 10,
  // duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // error rate should be less than 10%
  },
  discardResponseBodies: true,
  stages: [
    { duration: '30s', target: 20 },
    { duration: '30s', target: 40 },
    { duration: '30s', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 30 },
  ],
};

export default function main() {
  const productId = productIds[Math.floor(Math.random() * productIds.length)];

  const batch = [
    // {
    //   method: 'GET',
    //   url: `http://localhost:3034/api/products?page=1&count=10`,
    // },
    // {
    //   method: 'GET',
    //   url: `http://localhost:3034/api/products/${productId}`,
    // },
    {
      method: 'GET',
      url: `http://localhost:3034/api/products/${productId}/styles`,
    },
    // {
    //   method: 'GET',
    //   url: `http://localhost:3034/api/products/${productId}/related`,
    // },
    // {
    //   method: 'GET',
    //   url: `http://localhost:3034/api/cart?user=1234`,
    // },
  ];

  const responses = http.batch(batch);

  // responses.forEach((res) => {
  //   check(res, {
  //     'is status 200': (r) => (r.status === 200),
  //   });
  // });
}


// k6 run --out cloud ProductOverview/db/k6/LoadTest.js