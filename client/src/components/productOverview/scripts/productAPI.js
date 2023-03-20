import axios from 'axios';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

async function pullProductDetails() {
  let productData = {};

  try {
    const productID = 40345;
    const getConfig = {
      headers: {
        Authorization: process.env.AUTH_SECRET,
      },
    };
    console.log(process.env.AUTH_SECRET);
    await axios.get(`${serverURL}/products/${productID}`, getConfig);
  } catch (err) {
    console.error(`Could not get data from API: ${err}`);
  }
}

export default pullProductDetails;
