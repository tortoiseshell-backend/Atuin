import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getProductId: '',
  query: '',
  getQData: [],
  allQuestions: [],
  viewQuestions: [],
  qViewLength: 2,
  aViewExpanded: {},
};

export const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    saveGetResults: (state, action) => {
      const data = action.payload;
      state.getProductId = data.product_id;
      state.allQuestions = data.results;

      const sortedQuestions = Object.values(data.results).sort(
        (a, b) => b.question_helpfulness - a.question_helpfulness,
      );

      state.viewQuestions = sortedQuestions.slice(0, state.qViewLength);
    },
    search: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.length < 3) {
        state.viewQuestions = state.allQuestions.slice(0, state.qViewLength);
      } else {
        state.viewQuestions = state.allQuestions.filter(
          (q) => (q.question_body).toLowerCase().includes(query),
        );
      }
    },
    loadMoreQuestions: (state) => {
      state.qViewLength += 2;
      state.viewQuestions = state.allQuestions.slice(0, state.qViewLength);
    },
    expandAnswers: (state, action) => {
      state.aViewExpanded[action.payload.qId] = action.payload.opened;
    },
  },
});

export default qnaSlice.reducer;
export const {
  search, saveGetResults, moreViewQuestions, loadMoreQuestions, expandAnswers,
} = qnaSlice.actions;
