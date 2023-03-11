import { configureStore } from '@reduxjs/toolkit';

import { tmdbAPi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [tmdbAPi.reducerPath]: tmdbAPi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPi.middleware),
});
