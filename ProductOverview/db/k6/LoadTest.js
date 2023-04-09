import http from 'k6/http';
import { sleep, check } from 'k6';
import productIds from './seedSmall.js';

export const options = {
  vus: 50,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // error rate should be less than 10%
  },
  discardResponseBodies: true,
  // stages: [
  //   { duration: '30s', target: 20 },
  //   { duration: '30s', target: 40 },
  //   { duration: '30s', target: 50 },
  //   { duration: '2m', target: 50 },
  //   { duration: '30s', target: 50 },
  //   { duration: '30s', target: 30 },
  // ],
};

export default function main() {
  const productId = productIds[Math.floor(Math.random() * productIds.length)];

  const batch = [
    {
      method: 'GET',
      url: `http://localhost:3034/api/products?page=1&count=10`,
      name: 'get_products',
    },
    {
      method: 'GET',
      url: `http://localhost:3034/api/products/${productId}`,
      name: 'get_product',
    },
    {
      method: 'GET',
      url: `http://localhost:3034/api/products/${productId}/styles`,
      name: 'get_styles',
    },
    {
      method: 'GET',
      url: `http://localhost:3034/api/products/${productId}/related`,
      name: 'get_related',
    },
    {
      method: 'GET',
      url: `http://localhost:3034/api/cart?user=1234`,
      name: 'get_cart',
    },
  ];

  const responses = http.batch(batch);

  responses.forEach((res) => {
    check(res, {
      'is status 200': (r) => (r.status === 200),
    });

    console.log(`[${res.name}] ${res.timings.duration} ms`);
  });
}



// k6 run --out cloud ProductOverview/db/k6/LoadTest.js