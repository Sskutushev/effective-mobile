export const APP_NAME = 'MovieCatalog';
export const ITEMS_PER_PAGE = 12;
export const LOAD_MORE_ITEMS = 6;
export const DEBOUNCE_DELAY = 300;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const FILTER_CATEGORIES = [
  { id: 'all', label: 'Все фильмы' },
  { id: 'new', label: 'Новинки' },
  { id: 'premieres', label: 'Премьеры' },
  { id: 'popular', label: 'Популярные' },
  { id: 'top50', label: 'Топ 50' },
] as const;