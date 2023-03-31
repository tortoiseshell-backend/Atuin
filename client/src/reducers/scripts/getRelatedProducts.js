import axios from 'axios';

const getConfig = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

async function getRelatedProducts(productID, serverURL) {
  const response = await axios.get(`${serverURL}/products/${productID}/related`, getConfig);
  return response.data;
}

export default getRelatedProducts;
