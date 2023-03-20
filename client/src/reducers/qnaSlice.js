import { createSlice } from '@reduxjs/toolkit';
import questions from '../components/questionsAnswers/subComponents/initialData.jsx';

const initialState = {
  questions: questions.results,
  query: ''
}

export const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    search: (state, action) => {
      state.questions = state.questions.filter((q) => {
        return q.question_body.includes(action.payload);
      })
    }
  }
})

export default qnaSlice.reducer;
export const { setQuery, search } = qnaSlice.actions;
