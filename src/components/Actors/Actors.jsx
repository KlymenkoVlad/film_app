import React, { useState } from 'react';
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material';
import { useHistory, useParams } from 'react-router-dom';
import { MovieList, Pagination } from '..';

import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';

import useStyles from './styles';

// use params to get id
// make a new call using redux toolkit query -> get actor details call...
// research tmdb api docs
// use newly created useGetActorHook to get actors info to the component

function Actors() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const history = useHistory();

  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: dataMovies, isFetching: isFetchingMovies, error: errorMovies } = useGetMoviesByActorIdQuery({ id, page });

  console.log(dataMovies);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography>Something has gone wrong - Go back</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Go Back</Button>
      </Box>
    );
  }

  function moviesRender() {
    if (isFetchingMovies) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="8rem" />
        </Box>
      );
    } if (errorMovies) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>Sorry, nothing was found.</Typography>
        </Box>
      );
    } if (dataMovies) {
      return (
        <MovieList movies={dataMovies} numberOfMovies={12} />
      );
    }
  }
  // console.log(data);
  console.log(dataMovies);

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sx={3} md={4} lg={4} xl={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid item lg={8} style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Typography variant="h3" align="left" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h6" align="left" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '2rem' }}>
            {data?.biography}
          </Typography>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <Button variant="contained" target="_black" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>
                Back
              </Button>
            </Grid>
          </div>
        </div>

      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {
          moviesRender()
        }
        <Pagination currentPage={page} setPage={setPage} totalPages={dataMovies?.total_pages} />
      </Box>
    </Grid>
  );
}

export default Actors;
