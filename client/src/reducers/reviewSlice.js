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
  },
});

export const getReviewsAsync = (page, sortedBy, productId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/?page=${page}&count=${10}&sort=${sortedBy}&product_id=${productId}`, API_CONFIG);
    dispatch(reviewSlice.actions.getReviews(response.data));
    dispatch(reviewSlice.actions.nextPage());
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const addReviewAsync = (data, productId) => async (dispatch, getState) => {
  try {
    await axios.post(API_URL, data, API_CONFIG);
    const state = getState();
    dispatch(getReviewsAsync(state.reviews.page, 10, 'newest', productId));
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default reviewSlice.reducer;
export const { getReviews, nextPage } = reviewSlice.actions;
// export const reviewSlice = createSlice({
//   name: 'reviews',
//   initialState: {
//     data: [],
//     page: 1,
//   },
//   reducers: {
//     getReviews: (state, action) => {
//       state.data = action.payload;
//     },
//     nextPage: (state) => {
//       state.page += 1;
//     },
//   },
// });

// export const getReviewsAsync = () => async (dispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}/?page=${reviewSlice.page}&count=${10}
// &sort=${useSelector((state) => state.sort.sortedBy)}&product_id=${useSelector((state) =>
//  state.product.id)}`, API_CONFIG);
//     dispatch(getReviews(response.data.results));
//     dispatch(nextPage());
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const addTodoAsync = (data) => async () => {
//   try {
//     // console.log(data);
//     await axios.post(API_URL, data, API_CONFIG);
//     // console.log(response);
//     getReviewsAsync();
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export default reviewSlice.reducer;
// export const showReviews = (state) => state.reviews.data;
// export const { getReviews, nextPage } = reviewSlice.actions;
