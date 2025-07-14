import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { movieStore } from '../stores/MovieStore';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Stack
} from '@mui/material';
import { ModalConfirm } from '../Components/ModalConfirm';

export const MovieDetailPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { detail, isLoading, favorites, toggleFavorite } = movieStore;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) movieStore.loadDetail(id);
  }, [id]);

  if (isLoading || !detail) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const isFav = favorites.includes(detail.id);

  return (
    <Paper sx={{ p: 3 }} elevation={2}>
      {detail.poster?.url && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img
            style={{ borderRadius: 8 }}
            src={detail.poster.url}
            alt={detail.nameRu}
            height={400}
          />
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        {detail.nameRu} ({detail.year})
      </Typography>
      <Typography paragraph>{detail.description}</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Chip label={`★ ${detail.rating?.kp ?? '–'}`} color="primary" />
        <Chip label={`Дата: ${detail.releaseDate}`} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {detail.genres.map((g) => (
          <Chip key={g.genre} label={g.genre} />
        ))}
      </Stack>

      {!isFav ? (
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Добавить в избранное
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => toggleFavorite(detail.id)}>
          Убрать из избранного
        </Button>
      )}

      <ModalConfirm
        open={modalOpen}
        title="Добавить в избранное?"
        onConfirm={() => {
          toggleFavorite(detail.id);
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </Paper>
  );
});
