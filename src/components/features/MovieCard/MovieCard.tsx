import React from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../../types/movie.types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-surface shadow-lg transition-shadow duration-300 hover:shadow-2xl"
      onClick={() => onClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(movie);
        }
      }}
    >
      {/* Постер */}
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Рейтинг */}
      <div className="absolute left-3 top-3 rounded-lg bg-rating-bg px-2.5 py-1 shadow-lg">
        <span className="text-sm font-semibold text-rating-text">
          {movie.rating}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">
            {movie.year} • {movie.genre.join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};