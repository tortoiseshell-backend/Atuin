import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'reviews',
  initialState: {
    show: false,
  },
  reducers: {
    toggle: (state) => {
      state.show = !state.show;
    },
  },
});

export default modalSlice.reducer;
export const { toggle } = modalSlice.actions;
