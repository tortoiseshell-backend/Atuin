import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@reducers/themeSlice';
import qnaReducer from '@reducers/qnaSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    qna: qnaReducer,
  },
});

export default store;
