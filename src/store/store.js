import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import episodeSelectedReducer from './episodeSelectedSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    episodeSelected: episodeSelectedReducer
  }
});
