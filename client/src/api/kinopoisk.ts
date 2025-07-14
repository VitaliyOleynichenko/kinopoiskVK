// client/src/api/kinopoisk.ts

import axios from 'axios'
import { Movie, Filters, MovieDetail } from '../types'

/**
 * В .env должно быть:
 * REACT_APP_KP_API_URL=https://api.kinopoisk.dev
 * REACT_APP_KP_API_KEY=ваш_ключ
 */
const ROOT = process.env.REACT_APP_KP_API_URL
const KEY  = process.env.REACT_APP_KP_API_KEY

if (!ROOT) throw new Error('REACT_APP_KP_API_URL is not defined')
if (!KEY)  throw new Error('REACT_APP_KP_API_KEY is not defined')

/**
 * Клиент на v1: все запросы идут к /v1
 */
const api = axios.create({
  baseURL: `${ROOT}/v1`,
  headers: { 'X-API-KEY': KEY },
  timeout: 5000,
})

/**
 * 1) Получаем все жанры
 * GET /v1/movie/possible-values-by-field?field=genres
 */
export async function fetchAllGenres(): Promise<string[]> {
  try {
    const res = await api.get<{ possibleValues: string[] }>(
      '/movie/possible-values-by-field',
      { params: { field: 'genres' } }
    )
    return Array.isArray(res.data.possibleValues)
      ? res.data.possibleValues
      : []
  } catch (e) {
    console.error('fetchAllGenres error', e)
    return []
  }
}

/**
 * 2) Поиск фильмов с пагинацией и фильтрами
 * GET /v1/movie?page=&limit=&genres=&rating.kp=&year=
 */
export async function fetchMovies(
  page: number,
  filters: Filters
): Promise<{ docs: Movie[]; total: number }> {
  const params: Record<string, any> = { page, limit: 50 }

  if (filters.genres.length) {
    params.genres = filters.genres.join(',')
  }
  if (filters.ratingFrom != null && filters.ratingTo != null) {
    params['rating.kp'] = `${filters.ratingFrom}-${filters.ratingTo}`
  }
  if (filters.yearFrom != null && filters.yearTo != null) {
    params.year = `${filters.yearFrom}-${filters.yearTo}`
  }

  try {
    const res = await api.get<{ docs: Movie[]; total: number }>(
      '/movie',
      { params }
    )
    return {
      docs: Array.isArray(res.data.docs) ? res.data.docs : [],
      total: typeof res.data.total === 'number'
        ? res.data.total
        : 0,
    }
  } catch (e) {
    console.error('fetchMovies error', e)
    return { docs: [], total: 0 }
  }
}

/**
 * 3) Детали фильма по ID
 * GET /v1/movie/{id}
 */
export async function fetchMovieById(
  id: string
): Promise<MovieDetail | null> {
  try {
    const res = await api.get<MovieDetail>(`/movie/${id}`)
    return res.data
  } catch (e) {
    console.error('fetchMovieById error', e)
    return null
  }
}
