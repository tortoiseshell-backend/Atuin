import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@reducers/themeSlice';
import qnaReducer from '@reducers/qnaSlice';
import sortReducer from '@reducers/sortSlice';
import reviewsReducer from '@reducers/reviewSlice';
import modalReducer from '@reducers/modalSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    qna: qnaReducer,
    sort: sortReducer,
    reviews: reviewsReducer,
    modal: modalReducer,
  },
});

export default store;
