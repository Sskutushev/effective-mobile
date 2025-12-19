import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@components/layout/Header/Header';
import { BrowserRouter } from 'react-router-dom';

// Mock ThemeToggle as it's tested separately
vi.mock('@components/common/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe('Header', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders logo, title and theme toggle', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('MovieCatalog')).toBeInTheDocument();
    expect(document.querySelector('.lucide-film')).toBeInTheDocument();
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });

  it('has a link to the home page', () => {
    renderWithRouter(<Header />);
    
    const link = screen.getByRole('link', { name: /moviecatalog/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
