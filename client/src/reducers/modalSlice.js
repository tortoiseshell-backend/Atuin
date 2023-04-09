import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalOpen: false,
    componentType: null,
    componentProps: {},
  },
  reducers: {
    toggle: (state) => {
      state.modalOpen = !state.modalOpen;
    },
    setModalType: (state, action) => {
      state.componentType = action.payload;
    },
    setModalProps: (state, action) => {
      state.componentProps = action.payload;
    },
  },
});

export const { toggle, setModalProps, setModalType } = modalSlice.actions;

export default modalSlice.reducer;
