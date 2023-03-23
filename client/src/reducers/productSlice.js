import { createSlice } from '@reduxjs/toolkit';
import getProductDetails from './scripts/getProductDetails';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    id: 40344,
    name: 'Nostrud Excepteur',
    category: 'Animtempor.',
    default_price: 0,
    slogan: 'Cupidatat ea dolore et veniam non voluptate sunt ad cupidatat incididunt consectetur.',
    description: 'Laboris laborum eiusmod in labore laboris anim laborum id id occaecat laborum nulla nisi ullamco. Quis duis ullamco laboris dolor culpa eu. Cillum ipsum voluptate est qui.',
    features: [],
    styles: [],
    selectedStyleID: 0,
    selectedPhotoID: 0,
    isExpandedView: false,
    isFavorited: false,
  },
  reducers: {
    setProduct(state, action) {
      state.product_id = action.payload.id;
      state.name = action.payload.name;
      state.category = action.payload.category;
      state.default_price = action.payload.default_price;
      state.slogan = action.payload.slogan;
      state.description = action.payload.description;
      state.features = action.payload.features;
      state.styles = action.payload.results;
      state.selectedStyleID = 0;
      state.selectedPhotoID = 0;
    },
    toggleViewState(state) {
      state.isExpandedView = !state.isExpandedView;
    },
    toggleFavorite(state) {
      state.isFavorited = !state.isFavorited;
    },
  },
});

export const getProductDetailsAsync = (productID) => async (dispatch) => {
  const responseData = await getProductDetails(productID, API_URL);
  dispatch(productSlice.actions.setProduct(responseData));
};

export default productSlice.reducer;
export const { setProduct, toggleViewState, toggleFavorite } = productSlice.actions;
