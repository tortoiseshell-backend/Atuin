/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import getRelatedProducts from './scripts/getRelatedProducts';
import getProductDetails from './scripts/getProductDetails';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const relatedSlice = createSlice({
  name: 'related',
  initialState: {
    itemsRelated: [],
  },
  reducers: {
    setRelatedItems(state, action) {
      state.itemsRelated = action.payload;
    },
  },
});

export const getRelatedProductsAsync = (productID) => async (dispatch) => {
  const responseData = await getRelatedProducts(productID, API_URL);
  const productInfo = await Promise.all(
    responseData.map(async (product) => getProductDetails(product, API_URL)),
  );

  dispatch(relatedSlice.actions.setRelatedItems(productInfo));
};

export default relatedSlice.reducer;
export const {
  setRelatedItems,
} = relatedSlice.actions;
