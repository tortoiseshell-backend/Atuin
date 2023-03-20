import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@reducers/themeSlice';
import qnaReducer from '@reducers/qnaSlice';
import sortReducer from '@reducers/sortSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    qna: qnaReducer,
    sort: sortReducer,
  },
});

export default store;
