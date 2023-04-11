/* eslint-disable no-param-reassign */
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
    metaData: {},
    rendered: [],
    averageRating: 0,
  },
  reducers: {
    getReviews: (state, action) => {
      [state.data, state.metaData] = action.payload;
      state.rendered = state.data;
    },
    setRenderedReviews: (state, action) => {
      state.rendered = action.payload;
    },
    setAverageRating: (state, action) => {
      state.averageRating = action.payload;
    },
  },
});

export const { getReviews, setRenderedReviews, setAverageRating } = reviewSlice.actions;

export const getReviewsAsync = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const prodId = state.product.id; // good products: 40435 40436
    const metaResponse = await axios.get(`${API_URL}/meta/?product_id=${prodId} `, API_CONFIG);
    let responseTuple = [[], {}]
    if (Object.keys(metaResponse.data.ratings).length > 0) {
    const reviewCount = Object.values(metaResponse.data.recommended).reduce(
      (trueR, falseR) => Number(falseR) + Number(trueR),
    );
    const { ratings, recommended, characteristics } = metaResponse.data;

    const sumOfKeyValues = Object.entries(ratings)
      .reduce((sum, [key, value]) => sum + Number(key) * Number(value), 0);
    const sumOfValues = Object.values(ratings)
      .reduce((sum, value) => sum + Number(value), 0);
    const averageRating = sumOfKeyValues / sumOfValues;

    const reviewResponse = await axios.get(`${API_URL}/?page=1&count=${reviewCount}&sort=${state.sort.sortedBy}&product_id=${prodId}`, API_CONFIG);
    responseTuple = [reviewResponse.data.results, {
      ratings, recommended, characteristics, averageRating,
    }];
  }
    dispatch(getReviews(responseTuple));
  } catch (err) {
    throw new Error(err);
  }
};

export const addReviewAsync = (data) => async (dispatch) => {
  try {
    await axios.post(API_URL, data, API_CONFIG);
    dispatch(getReviewsAsync());
  } catch (err) {
    throw new Error(err);
  }
};

export default reviewSlice.reducer;
