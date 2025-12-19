import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../../types/movie.types';

// Mock data for testing
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  year: 2024,
  genre: ['Drama'],
  director: 'Test Director',
  rating: 8.5,
  poster: '/test.jpg',
  description: 'Test description',
};

describe('MovieCard', () => {
  const mockClick = vi.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} onClick={mockClick} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<MovieCard movie={mockMovie} onClick={mockClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockClick).toHaveBeenCalledWith(mockMovie);
  });

  it('displays original title when available', () => {
    const movieWithOriginalTitle = {
      ...mockMovie,
      originalTitle: 'Original Title',
    };

    render(<MovieCard movie={movieWithOriginalTitle} onClick={mockClick} />);
    
    expect(screen.getByText('Original Title')).toBeInTheDocument();
  });

  it('formats multiple genres correctly', () => {
    const movieWithMultipleGenres = {
      ...mockMovie,
      genre: ['Action', 'Adventure', 'Sci-Fi'],
    };

    render(<MovieCard movie={movieWithMultipleGenres} onClick={mockClick} />);
    
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
  });
});