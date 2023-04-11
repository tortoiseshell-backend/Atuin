import axios from 'axios';

const getConfig = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

async function getProductList(serverURL) {
  const response = await axios.get(`${serverURL}/products?page=1&count=5`, getConfig);
  return response.data;
}

export default getProductList;
