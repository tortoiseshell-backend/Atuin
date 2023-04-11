import axios from 'axios';

const getConfig = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

function objectDeconstructor(data, keys) {
  const newObj = {};
  keys.forEach((key) => {
    newObj[key] = data[key];
  });
  return newObj;
}

async function appendProductPrimaryDetails(productID, serverURL, resultObject) {
  const response = await axios.get(`${serverURL}/products/${productID}`, getConfig);
  return {
    ...resultObject,
    ...objectDeconstructor(
      response.data,
      ['id', 'name', 'category', 'default_price', 'slogan', 'description', 'features'],
    ),
  };
}

async function appendProductStylesDetails(productID, serverURL, resultObject) {
  const response = await axios.get(`${serverURL}/products/${productID}/styles`, getConfig);
  return {
    ...resultObject,
    ...objectDeconstructor(response.data, ['results']),
  };
}

async function getProductDetails(productID, serverURL) {
  try {
    let productData = await appendProductPrimaryDetails(productID, serverURL, {});
    productData = await appendProductStylesDetails(productID, serverURL, productData);
    return productData;
  } catch (err) { throw new Error(err); }
}

export default getProductDetails;
