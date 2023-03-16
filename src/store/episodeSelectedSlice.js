import { createSlice } from '@reduxjs/toolkit';

export const episodeSelectedSlice = createSlice({
  name: 'episodeSelected',
  initialState: {
    value: null
  },
  reducers: {
    setEpisodeSelected: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setEpisodeSelected } = episodeSelectedSlice.actions;

export default episodeSelectedSlice.reducer;
