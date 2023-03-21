import { createSlice } from '@reduxjs/toolkit';

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

export default sortSlice.reducer;
export const { toggle } = sortSlice.actions;
