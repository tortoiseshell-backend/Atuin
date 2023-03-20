import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '../reducers/themeSlice';
import qnaReducer from '../reducers/qnaSlice.js';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducers,
    qna: qnaReducer,
  },
});

export default store;
