import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbAPi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    getMovies: builder.query({
      query: ({ page, genreIdOrCategoryName, searchQuery }) => {
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} = tmdbAPi;
