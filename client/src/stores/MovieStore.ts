

import { makeAutoObservable, runInAction } from 'mobx'
import { Movie, Filters, MovieDetail } from '../types'
import { fetchMovies, fetchMovieById, fetchAllGenres } from '../api/kinopoisk'

export class MovieStore {
  movies: Movie[] = []
  page = 1
  total = 0
  isLoading = false
  filters: Filters = {
    genres: [],
    ratingFrom: 0,
    ratingTo: 10,
    yearFrom: 1990,
    yearTo: new Date().getFullYear(),
  }
  allGenres: string[] = []
  favorites: string[] = []
  detail: MovieDetail | null = null

  constructor() {
    makeAutoObservable(this)
    this.loadGenres()
    this.loadFavorites()
  }

  /** Загружает все возможные жанры */
  async loadGenres() {
    const list = await fetchAllGenres()
    runInAction(() => {
      this.allGenres = list
    })
  }

  /**
   * Подгружает страницу фильмов.
   * @param reset — если true, сбрасывает список и пагинацию
   */
  async loadMovies(reset = false) {
    if (this.isLoading) return
    this.isLoading = true

    if (reset) {
      this.page = 1
      this.movies = []
      this.total = 0     // ← обнуляем общее число
    }

    const { docs, total } = await fetchMovies(this.page, this.filters)
    runInAction(() => {
      this.movies.push(...docs)
      this.total = total
      this.page += 1
      this.isLoading = false
    })
  }

  /** Устанавливает фильтры и перезагружает первый набор */
  setFilters = (newFilters: Partial<Filters>) => {
    Object.assign(this.filters, newFilters)
    this.loadMovies(true)
  }

  /** Загружает подробности по фильму */
  async loadDetail(id: string) {
    this.detail = null
    this.isLoading = true
    const d = await fetchMovieById(id)
    runInAction(() => {
      this.detail = d
      this.isLoading = false
    })
  }

  /** Переключает состояние "избранное" */
  toggleFavorite = (id: string) => {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(x => x !== id)
    } else {
      this.favorites.push(id)
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  /** Загружает избранное из localStorage */
  loadFavorites() {
    const raw = localStorage.getItem('favorites')
    if (raw) this.favorites = JSON.parse(raw)
  }
}

export const movieStore = new MovieStore()
