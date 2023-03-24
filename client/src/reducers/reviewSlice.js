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
  },
  reducers: {
    getReviews: (state, action) => {
      state.data = action.payload.results;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
});

export const getReviewsAsync = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { sortedBy } = state.sort;
    const prodId = state.product.id;
    const response = await axios.get(`${API_URL}/?page=${state.reviews.page}&count=${10}&sort=${sortedBy}&product_id=${prodId}`, API_CONFIG);
    console.log(response);
    dispatch(reviewSlice.actions.getReviews(response.data));
    // dispatch(reviewSlice.actions.nextPage());
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
export const { getReviews, nextPage, resetPage } = reviewSlice.actions;
