import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { MovieListPage } from './pages/MovieListPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';

const App: React.FC = () => (
  <>
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          MovieLab
        </Typography>
        <Button color="inherit" component={Link} to="/favorites">
          Избранное
        </Button>
      </Toolbar>
    </AppBar>

    <Container sx={{ mt: 4, mb: 4 }}>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Container>
  </>
);

export default App;
