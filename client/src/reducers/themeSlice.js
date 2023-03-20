import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'darkTheme',
  initialState: { },
  reducers: {
    toggle(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
