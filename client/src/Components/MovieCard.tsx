import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Card>
    <CardActionArea component={Link} to={`/movie/${movie.id}`}>
      {movie.poster?.url && (
        <CardMedia
          component="img"
          height="250"
          image={movie.poster.url}
          alt={movie.nameRu}
        />
      )}
      <CardContent>
        <Typography variant="subtitle1" noWrap>
          {movie.nameRu}
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
        <Typography variant="body2">★ {movie.rating?.kp ?? '–'}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
