import axios from 'axios';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const productID = 40344;
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

async function appendProductPrimaryDetails(resultObject) {
  const response = await axios.get(`${serverURL}/products/${productID}`, getConfig);
  return {
    ...resultObject,
    ...objectDeconstructor(
      response.data,
      ['id', 'name', 'category', 'default_price', 'slogan', 'description', 'features'],
    ),
  };
}

async function appendProductStylesDetails(resultObject) {
  const response = await axios.get(`${serverURL}/products/${productID}/styles`, getConfig);
  return {
    ...resultObject,
    ...objectDeconstructor(response.data, ['results']),
  };
}

async function getProductDetails() {
  try {
    let productData = await appendProductPrimaryDetails({});
    productData = await appendProductStylesDetails(productData);
    return productData;
  } catch (err) { return (err); }
}

export default getProductDetails;
