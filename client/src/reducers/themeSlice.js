import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'darkTheme',
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggle: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export default themeSlice.reducer;
export const { toggle } = themeSlice.actions;
