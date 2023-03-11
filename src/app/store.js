import { configureStore } from '@reduxjs/toolkit';

import { tmdbAPi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [tmdbAPi.reducerPath]: tmdbAPi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPi.middleware),
});
