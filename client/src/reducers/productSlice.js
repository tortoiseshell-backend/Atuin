import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productInformation',
  initialState: {
    value: {},
    styleID: 0,
    photoID: 0,
  },
  reducers: {
    set(state, action) {
      state.value = action;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
