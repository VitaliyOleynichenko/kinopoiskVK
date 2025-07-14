export interface Movie {
  id: string;
  nameRu: string;
  year: number;
  poster?: { url: string };
  rating?: { kp: number };
  genres: { genre: string }[];
}

export interface MovieDetail extends Movie {
  description: string;
  releaseDate: string;
}

export interface Filters {
  genres: string[];
  ratingFrom: number;
  ratingTo: number;
  yearFrom: number;
  yearTo: number;
}