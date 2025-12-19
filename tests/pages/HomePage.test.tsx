import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { HomePage } from '@pages/HomePage/HomePage';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';

// Mock the movies data
vi.mock('@/data/movies.json', () => ({
  movies: [
    { id: 1, title: 'Test Movie 1', year: 2024, genre: ['Drama'], rating: 8.5, poster: '/test-poster.jpg' },
    { id: 2, title: 'Another Movie', year: 2023, genre: ['Action'], rating: 7.5, poster: '/test-poster.jpg' },
  ],
}));

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('HomePage Integration Test', () => {
  it('renders movies and allows searching', async () => {
    renderHomePage();

    // Wait for movies to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Another Movie')).toBeInTheDocument();
    });

    // Search for a movie
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
      expect(screen.queryByText('Another Movie')).not.toBeInTheDocument();
    });
  });

  it('allows filtering by category', async () => {
    renderHomePage();
    
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    const popularTab = screen.getByTestId('filter-tab-popular');
    fireEvent.click(popularTab);

    await waitFor(() => {
        expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
        expect(screen.queryByText('Another Movie')).not.toBeInTheDocument();
    });
  });

  it('opens modal when movie card is clicked', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });

    const movieCard = screen.getByText('Test Movie 1');
    fireEvent.click(movieCard);

    await waitFor(async () => {
      const modal = await screen.findByRole('dialog');
      expect(modal).toBeInTheDocument();
      const modalTitle = within(modal).getByText('Test Movie 1');
      expect(modalTitle).toBeInTheDocument();
    });
  });
});