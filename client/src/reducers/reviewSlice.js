/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const axios = require('axios');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';
const API_CONFIG = {
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    data: [],
    page: 1,
    hasMore: true,
  },
  reducers: {
    getReviews: (state, action) => {
      const reviews = action.payload.results;
      state.hasMore = reviews.length === 100;
      state.data = [...state.data, ...reviews];
    },
    resetReviews: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
    nextPage: (state) => {
      state.page += 1;
    },
  },
});

export const { getReviews, resetReviews } = reviewSlice.actions;

export const getReviewsAsync = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { sortedBy } = state.sort;
    const prodId = 40435; // state.product.id;  40344
    console.log(state.reviews.page);
    const response = await axios.get(`${API_URL}/?page=${state.reviews.page}&count=${100}&sort=${sortedBy}&product_id=${prodId}`, API_CONFIG);
    dispatch(getReviews(response.data));
    dispatch(reviewSlice.actions.nextPage());
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const addReviewAsync = (data) => async (dispatch) => {
  try {
    await axios.post(API_URL, data, API_CONFIG);
    dispatch(getReviewsAsync());
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default reviewSlice.reducer;
