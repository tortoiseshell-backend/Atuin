import { createSlice } from '@reduxjs/toolkit';
import getProductDetails from './scripts/getProductDetails';
import getProductList from './scripts/getProductList';

const API_URL = 'http://localhost:3034/api';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    value: {},
    productList: [],
    id: 40436,
    name: 'Nostrud Excepteur',
    category: 'Animtempor.',
    default_price: 0,
    slogan: 'Cupidatat ea dolore et veniam non voluptate sunt ad cupidatat incididunt consectetur.',
    description: 'Laboris laborum eiusmod in labore laboris anim laborum id id occaecat laborum nulla nisi ullamco. Quis duis ullamco laboris dolor culpa eu. Cillum ipsum voluptate est qui.',
    features: [],
    styles: [],
    selectedStyleID: [],
    selectedImage: [],
    selectedSKU: 0,
    sale_price: null,
    isExpandedView: false,
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setProduct(state, action) {
      state.value = action.payload;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.category = action.payload.category;
      state.default_price = action.payload.default_price;
      state.slogan = action.payload.slogan;
      state.description = action.payload.description;
      state.features = action.payload.features;
      state.styles = action.payload.results;
      state.selectedStyleID = state.styles[0].style_id;
      state.selectedSKU = Object.keys(state.styles[0].skus)[0];
      state.sale_price = state.styles[0].sale_price;
      const photo = state.styles[0].photos[0];
      state.selectedImage = [state.selectedStyleID, 0, photo?.thumbnail_url, photo?.url];
    },
    selectStyle(state, action) {
      const prevStyleData = state.styles
        .find((style) => style.style_id === state.selectedStyleID);

      const selectedSize = prevStyleData.skus[state.selectedSKU].size;
      state.selectedStyleID = action.payload;
      const styleData = state.styles
        .find((style) => style.style_id === state.selectedStyleID);
      state.selectedSKU = Object.keys(styleData.skus)
        .find((sku) => styleData.skus[sku].size === selectedSize)
        || Object.keys(styleData.skus)[0];
      state.sale_price = styleData.sale_price;
    },
    selectSize(state, action) {
      state.selectedSKU = action.payload;
    },
    selectImage(state, action) {
      state.selectedImage = action.payload;
    },
    toggleViewState(state) {
      state.isExpandedView = !state.isExpandedView;
    },
  },
});

export const getProductDetailsAsync = (productID) => async (dispatch) => {
  const responseData = await getProductDetails(productID, API_URL);
  dispatch(productSlice.actions.setProduct(responseData));
};

export const getProductListAsync = () => async (dispatch) => {
  const responseData = await getProductList(API_URL);
  dispatch(productSlice.actions.setProductList(responseData));
};

export default productSlice.reducer;
export const {
  setProduct,
  toggleViewState,
  selectStyle,
  selectSize,
  selectImage,
  setProductID,
  setProductList,
} = productSlice.actions;
