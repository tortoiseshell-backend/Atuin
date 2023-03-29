/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import getCartData from './scripts/getCartData';
import addCartData from './scripts/addCartData';
import getProductDetails from './scripts/getProductDetails';
import getProductList from './scripts/getProductList';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    itemInfo: {},
  },
  reducers: {
    setAllProducts(state, action) {
      state.itemInfo = action.payload;
    },
    setCartItems(state, action) {
      state.items = action.payload;
    },
    populateItemInfo(state, action) {
      state.itemInfo = action.payload;
    },
  },
});

export const initializeProductData = () => async (dispatch) => {
  const productIds = await getProductList(API_URL);
  const allProducts = {};
  await Promise.all(productIds.map(async (product) => {
    const responseData = await getProductDetails(product.id, API_URL);
    responseData.results.forEach((style) => {
      const skuList = Object.keys(style.skus);
      skuList.forEach((sku) => {
        allProducts[sku] = {
          id: product.id,
          name: product.name,
          style: style.name,
          original_price: style.original_price,
          sale_price: style.sale_price,
          thumbnail_url: style.photos[0].thumbnail_url,
          size: style.skus[sku].size,
        };
      });
    });
    return responseData;
  }));
  dispatch(cartSlice.actions.setAllProducts(allProducts));
};

export const getCartDataAsync = () => async (dispatch) => {
  const responseData = await getCartData(API_URL);
  dispatch(cartSlice.actions.setCartItems(responseData));
};

export const addCartItem = (product_id, sku_id, quantity) => async () => {
  for (let i = 0; i < quantity; i += 1) {
    addCartData(API_URL, {
      product_id,
      sku_id,
    });
  }
};

export default cartSlice.reducer;
export const {
  setCartItems,
  populateItemInfo,
} = cartSlice.actions;
