import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: false
  },
  reducers: {
    showLoader: (state) => {
      state.value = true;
    },
    hideLoader: (state) => {
      state.value = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
