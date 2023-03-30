import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const axios = require('axios');

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
    // refresh: (state, action) => {
    //   const dispatch = useDispatch();
    //   const { id } = useSelector((state) => state.product);
    //   const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/';
    //   const API_CONFIG = {
    //     params: {
    //       product_id: id, // TODO: replace with global product_id variable
    //       page: 1,
    //       count: 20,
    //     },
    //     headers: {
    //       Authorization: process.env.AUTH_SECRET,
    //     },
    //   };
    //   axios.get(API_URL, API_CONFIG)
    //     .then((res) => {
    //       dispatch(saveGetResults(res.data));
    //     })
    //     .catch((err) => {
    //       throw new Error(err);
    //     });
    // },
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
    updateQAndA: (state, action) => {
      console.log('payload: ', action.payload);
      state.allQuestions = [...state.allQuestions].push(action.payload);
      console.log('allQuestions: ', state.allQuestions);
    },
  },
});

export default qnaSlice.reducer;
export const {
  search, saveGetResults, moreViewQuestions, loadMoreQuestions, expandAnswers, updateQAndA,
} = qnaSlice.actions;
