import { createSlice } from '@reduxjs/toolkit';
import questions from '../components/questionsAnswers/subComponents/initialData';

const initialState = {
  getProductId: '',
  getQData: [],
  allQuestions: questions.results,
  viewQuestions: questions.results,
  query: '',
};

export const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    saveGetResults: (state, action) => {
      const data = action.payload;
      state.getProductId = data.product_id;
      state.allQuestions = data.results;
      state.viewQuestions = data.results;
      console.log(state.allQuestions);
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
  },
});

export default qnaSlice.reducer;
export const { search, saveGetResults } = qnaSlice.actions;
