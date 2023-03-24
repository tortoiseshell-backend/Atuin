import { createSlice } from '@reduxjs/toolkit';
import {
  getReviewsAsync,
} from '@reducers/reviewSlice';

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    sortedBy: 'relevant',
  },
  reducers: {
    toggle: (state, action) => {
      state.sortedBy = action.payload;
    },
  },
});

export const toggleSort = (sortedBy) => async (dispatch) => {
  dispatch(sortSlice.actions.toggle(sortedBy));
  dispatch(getReviewsAsync());
};

export default sortSlice.reducer;
export const { toggle } = sortSlice.actions;
