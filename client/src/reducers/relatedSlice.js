/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import getRelatedProducts from './scripts/getRelatedProducts';
import getProductDetails from './scripts/getProductDetails';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const relatedSlice = createSlice({
  name: 'related',
  initialState: {
    itemsRelated: [],
    itemsOutfit: [],
  },
  reducers: {
    setRelatedItems(state, action) {
      state.itemsRelated = action.payload;
    },
    addOutfitItem(state, action) {
      const { id } = action.payload;
      let push = true;
      state.itemsOutfit.forEach((item, index) => {
        if (item.id === id) {
          state.itemsOutfit.splice(index, 1);
          push = false;
        }
      });
      if (push) { state.itemsOutfit.push(action.payload); }
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
  addOutfitItem,
} = relatedSlice.actions;
