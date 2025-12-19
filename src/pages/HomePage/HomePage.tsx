import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import type { Movie } from '../../types/movie.types';
import { Header } from '../../components/layout/Header/Header';
import { Container } from '../../components/layout/Container/Container';
import { MovieCard } from '../../components/features/MovieCard/MovieCard';
import { SearchBar } from '../../components/features/SearchBar/SearchBar';
import { FilterTabs } from '../../components/features/FilterTabs/FilterTabs';
import { MovieModal } from '../../components/features/MovieModal/MovieModal';
import { Skeleton } from '../../components/common/Skeleton/Skeleton';
import { ITEMS_PER_PAGE, LOAD_MORE_ITEMS } from '../../utils/constants';

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'new' | 'premieres' | 'popular' | 'top50'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  // Загрузка фильмов
  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Импортируем моковые данные
        const moviesData = await import('../../data/movies.json');
        setMovies(moviesData.movies);
        setFilteredMovies(moviesData.movies);
        setLoading(false);
      } catch (error) {
        console.error('Error loading movies:', error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Фильтрация
  useEffect(() => {
    let result = [...movies];

    // Поиск
    if (searchQuery) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Категория
    switch (filterCategory) {
      case 'new':
        result = result.filter(m => m.year >= 2024);
        break;
      case 'premieres':
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        result = result.filter(m => m.year >= sixMonthsAgo.getFullYear());
        break;
      case 'popular':
        result = result.filter(m => m.rating >= 8.0);
        break;
      case 'top50':
        result = result.sort((a, b) => b.rating - a.rating).slice(0, 50);
        break;
    }

    setFilteredMovies(result);
    setItemsToShow(ITEMS_PER_PAGE);
  }, [movies, filterCategory, searchQuery]);

  // Отображаемые фильмы
  useEffect(() => {
    setDisplayedMovies(filteredMovies.slice(0, itemsToShow));
  }, [filteredMovies, itemsToShow]);

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + LOAD_MORE_ITEMS);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: 'all' | 'new' | 'premieres' | 'popular' | 'top50') => {
    setFilterCategory(filter);
  };

  // Скелетон для загрузки
  const renderSkeletons = () => {
    return Array.from({ length: 12 }).map((_, index) => (
      <div key={index} className="aspect-[2/3]">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <Container>
            <div className="space-y-6 mb-8">
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-10 w-full max-w-2xl mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {renderSkeletons()}
            </div>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <Container>
          {/* Поиск и фильтры */}
          <div className="space-y-6 mb-8">
            <SearchBar onSearch={handleSearch} />
            <FilterTabs
              active={filterCategory}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Сетка фильмов */}
          {displayedMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Film className="h-20 w-20 text-text-secondary mb-4" />
              <p className="text-xl text-text-secondary">
                Фильмы не найдены
              </p>
              <p className="text-text-secondary mt-2">
                Попробуйте изменить поисковый запрос или фильтры
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {displayedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <MovieCard
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Кнопка "Показать больше" */}
              {itemsToShow < filteredMovies.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="rounded-full bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Показать больше
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </main>

      {/* Модалка */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};