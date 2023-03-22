import { createSlice } from '@reduxjs/toolkit';
import questions from '../components/questionsAnswers/subComponents/initialData';

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
      state.viewQuestions = data.results.slice(0, state.qViewLength);
    },
    search: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.length < 3) {
        state.viewQuestions = state.allQuestions;
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
  search, saveGetResults, moreViewQuestions, expandAnswers,
} = qnaSlice.actions;
