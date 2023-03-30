import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'darkTheme',
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      console.log(state.isDarkTheme);
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
