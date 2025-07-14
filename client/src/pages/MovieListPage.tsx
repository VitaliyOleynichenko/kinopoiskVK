import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, CircularProgress } from '@mui/material'
import { movieStore } from '../stores/MovieStore'
import { MovieCard } from '../Components/MovieCard'
import { FilterPanel } from '../Components/FilterPanel'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

export const MovieListPage: React.FC = observer(() => {
  const { movies, isLoading } = movieStore
  const loaderRef = useInfiniteScroll(() => movieStore.loadMovies())

  useEffect(() => {
    movieStore.loadMovies(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ p: 2 }}>
      <FilterPanel />

      {/* CSS Grid для карточек */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 2
        }}
      >
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <div ref={loaderRef} />
    </Box>
  )
})
