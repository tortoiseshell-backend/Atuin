import axios from 'axios';

const postConfig = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

async function addCartData(serverURL, cartItem) {
  return axios.post(`${serverURL}/cart`, cartItem, postConfig);
}

export default addCartData;
