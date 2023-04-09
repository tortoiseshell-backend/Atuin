import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@reducers/themeSlice';
import productReducer from '@reducers/productSlice';
import qnaReducer from '@reducers/qnaSlice';
import sortReducer from '@reducers/sortSlice';
import reviewsReducer from '@reducers/reviewSlice';
import modalReducer from '@reducers/modalSlice';
import cartReducer from '@reducers/cartSlice';
import relatedReducer from '@reducers/relatedSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    product: productReducer,
    qna: qnaReducer,
    sort: sortReducer,
    reviews: reviewsReducer,
    modal: modalReducer,
    cart: cartReducer,
    related: relatedReducer,
  },
});

export default store;
