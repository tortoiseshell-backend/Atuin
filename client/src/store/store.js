import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@reducers/themeSlice';
import qnaReducer from '@reducers/qnaSlice';
import sortReducer from '@reducers/sortSlice';
import reviewsReducer from '@reducers/reviewSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    qna: qnaReducer,
    sort: sortReducer,
    reviews: reviewsReducer,
  },
});

export default store;
