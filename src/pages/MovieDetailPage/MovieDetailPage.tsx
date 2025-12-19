import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';
import type { Movie } from '../../types/movie.types';
import { Header } from '../../components/layout/Header/Header';
import { Container } from '../../components/layout/Container/Container';
import { Skeleton } from '../../components/common/Skeleton/Skeleton';

export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const moviesData = await import('../../data/movies.json');
        const foundMovie = moviesData.movies.find((m: Movie) => m.id === Number(id));
        setMovie(foundMovie || null);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="relative h-[60vh]">
          <Skeleton className="w-full h-full" />
        </div>
        <Container className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Container className="py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Фильм не найден</h1>
            <p className="text-text-secondary mb-8">К сожалению, запрашиваемый фильм не найден</p>
            <Link
              to="/"
              className="rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Вернуться к каталогу
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <Header />

      {/* Hero секция */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <Container className="relative h-full flex items-end pb-12">
          <div className="max-w-3xl space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Назад к каталогу
            </button>

            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h1>

            {movie.originalTitle && (
              <p className="text-2xl text-gray-300">{movie.originalTitle}</p>
            )}

            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{movie.rating}</span>
              </div>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration} мин</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Контент */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                О фильме
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {movie.description}
              </p>
            </section>

            {/* Заглушки для дополнительных секций */}
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Актеры
              </h2>
              <p className="text-text-secondary">
                Информация скоро появится...
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Отзывы
              </h2>
              <p className="text-text-secondary">
                Скоро будут доступны отзывы зрителей и критиков.
              </p>
            </section>
          </div>

          {/* Боковая панель */}
          <aside className="space-y-6">
            <div className="rounded-xl bg-surface p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-1">
                  Режиссер
                </h3>
                <p className="text-text-primary">{movie.director}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-1">
                  Жанры
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {movie.country && (
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-1">
                    Страна
                  </h3>
                  <p className="text-text-primary">
                    {movie.country.join(', ')}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-1">
                  Длительность
                </h3>
                <p className="text-text-primary">
                  {movie.duration} минут
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-1">
                  Рейтинг
                </h3>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-text-primary font-medium">{movie.rating}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Смотреть трейлер
              </h3>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-text-secondary">Трейлер скоро появится</span>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </motion.div>
  );
};