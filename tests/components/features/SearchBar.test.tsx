import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '@components/features/SearchBar/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Test query' } });
    expect(input).toHaveValue('Test query');
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Test query' } });
    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Test query' } });
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
  });

  it('calls onSearch callback with debounced value', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Test query' } });
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Test query');
    }, { timeout: 400 });
  });
});
