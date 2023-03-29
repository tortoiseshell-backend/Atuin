import axios from 'axios';

const getConfig = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

async function getCartData(serverURL) {
  const response = await axios.get(`${serverURL}/cart`, getConfig);
  return response.data;
}

export default getCartData;
