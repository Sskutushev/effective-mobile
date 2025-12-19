export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  year: number;
  genre: string[];
  director: string;
  rating: number;
  poster: string;
  backdrop?: string;
  description: string;
  duration?: number;
  country?: string[];
}

export type FilterCategory =
  | 'all'
  | 'new'
  | 'premieres'
  | 'popular'
  | 'top50';

export interface FilterState {
  category: FilterCategory;
  searchQuery: string;
  selectedGenres: string[];
}

export type Theme = 'light' | 'dark';