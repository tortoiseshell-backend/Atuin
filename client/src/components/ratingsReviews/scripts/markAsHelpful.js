const axios = require('axios');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';
const API_CONFIG = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

export default async function markAsHelpful(reviewId) {
  const response = await axios.post(`${API_URL}/${reviewId}/helpful`, API_CONFIG);
  console.log(response);
  // return;
}
