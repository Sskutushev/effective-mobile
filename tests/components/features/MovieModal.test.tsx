import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieModal } from '@components/features/MovieModal/MovieModal';
import { Movie } from '@types/movie.types';
import { BrowserRouter } from 'react-router-dom';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  year: 2024,
  genre: ['Drama'],
  director: 'Test Director',
  rating: 8.5,
  poster: '/test.jpg',
  description: 'Test description',
  duration: 120,
  country: ['USA'],
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('MovieModal', () => {
  const onClose = vi.fn();

  it('does not render when isOpen is false', () => {
    renderWithRouter(<MovieModal movie={mockMovie} isOpen={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with movie details when isOpen is true', () => {
    renderWithRouter(<MovieModal movie={mockMovie} isOpen={true} onClose={onClose} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('120 мин')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Test Director')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithRouter(<MovieModal movie={mockMovie} isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Закрыть');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });
  
  it('calls onClose when "Подробнее" link is clicked', () => {
    renderWithRouter(<MovieModal movie={mockMovie} isOpen={true} onClose={onClose} />);
    
    const detailsLink = screen.getByText('Подробнее');
    fireEvent.click(detailsLink);
    
    expect(onClose).toHaveBeenCalled();
  });
});
