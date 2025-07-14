import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { movieStore } from '../stores/MovieStore';
import { MovieCard } from '../Components/MovieCard';

export const FavoritesPage: React.FC = observer(() => {
  const favIds = movieStore.favorites;

  if (favIds.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
        У вас ещё нет избранных фильмов.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Избранное
      </Typography>

      {/* И здесь CSS-Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 2,
        }}
      >
        {favIds.map((id) => {
          const movie = movieStore.movies.find((m) => m.id === id);
          return movie ? <MovieCard key={id} movie={movie} /> : null;
        })}
      </Box>
    </Box>
  );
});
