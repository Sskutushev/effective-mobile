import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../../types/movie.types';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  if (!movie || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`movie-modal-title-${movie.id}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-4xl rounded-2xl bg-surface shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 hover:bg-surface-hover"
              aria-label="Закрыть"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="max-h-[90vh] overflow-y-auto p-6">
              <div className="flex gap-6">
                {/* Постер */}
                <div className="w-[30%]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                {/* Информация */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 id={`movie-modal-title-${movie.id}`} className="text-3xl font-bold text-text-primary">
                      {movie.title}
                    </h2>
                    {movie.originalTitle && (
                      <p className="text-lg text-text-secondary">
                        {movie.originalTitle}
                      </p>
                    )}
                  </div>

                  {/* Рейтинг */}
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{movie.rating}</span>
                  </div>

                  {/* Детали */}
                  <div className="flex flex-wrap gap-4 text-text-secondary">
                    <span>{movie.year}</span>
                    {movie.duration && <span>{movie.duration} мин</span>}
                    {movie.country && <span>{movie.country.join(', ')}</span>}
                  </div>

                  {/* Жанры */}
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

                  {/* Режиссер */}
                  <div>
                    <span className="font-medium text-text-secondary">
                      Режиссер:
                    </span>{' '}
                    <span className="text-text-primary">{movie.director}</span>
                  </div>

                  {/* Описание */}
                  <p className="text-text-secondary leading-relaxed">
                    {movie.description}
                  </p>

                  {/* Кнопки */}
                  <div className="flex gap-3 pt-4">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="flex-1 rounded-full bg-primary px-6 py-3 text-center font-medium text-white transition-colors hover:bg-primary-hover"
                      onClick={onClose}
                    >
                      Подробнее
                    </Link>
                    <button
                      onClick={onClose}
                      className="rounded-full border-2 border-border px-6 py-3 font-medium text-text-primary transition-colors hover:bg-surface-hover"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};