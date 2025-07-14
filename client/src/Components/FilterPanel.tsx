import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
  Button
} from '@mui/material'
import { movieStore } from '../stores/MovieStore'
import { Filters } from '../types'

export const FilterPanel: React.FC = observer(() => {
  const { allGenres, filters } = movieStore
  const [local, setLocal] = useState<Filters>(filters)

  useEffect(() => {
    // Синхронизируем локальные значения с хранилищем
    setLocal({ ...filters })
  }, [filters])

  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
      <Typography variant="h6" gutterBottom>Жанры</Typography>
      <FormGroup row>
        {allGenres.map(g => (
          <FormControlLabel
            key={g}
            control={
              <Checkbox
                checked={local.genres.includes(g)}
                onChange={e => {
                  const next = e.target.checked
                    ? [...local.genres, g]
                    : local.genres.filter(x => x !== g)
                  setLocal({ ...local, genres: next })
                }}
              />
            }
            label={g}
          />
        ))}
      </FormGroup>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Рейтинг</Typography>
      <Slider
        value={[local.ratingFrom, local.ratingTo]}
        min={0}
        max={10}
        onChange={(_, v) =>
          setLocal({
            ...local,
            ratingFrom: (v as number[])[0],
            ratingTo: (v as number[])[1]
          })
        }
        valueLabelDisplay="auto"
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Год</Typography>
      <Slider
        value={[local.yearFrom, local.yearTo]}
        min={1990}
        max={new Date().getFullYear()}
        onChange={(_, v) =>
          setLocal({
            ...local,
            yearFrom: (v as number[])[0],
            yearTo: (v as number[])[1]
          })
        }
        valueLabelDisplay="auto"
      />

      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => movieStore.setFilters(local)}
        >
          Применить
        </Button>
      </Box>
    </Paper>
  )
})
