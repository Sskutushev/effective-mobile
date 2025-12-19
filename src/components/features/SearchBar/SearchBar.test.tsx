import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly with placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск фильмов...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск фильмов...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    expect(input).toHaveValue('Test query');
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск фильмов...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    const clearButton = screen.getByLabelText('Очистить');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск фильмов...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    const clearButton = screen.getByLabelText('Очистить');
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('calls onSearch callback with debounced value', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск фильмов...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    // Wait for debounce delay
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Test query');
    }, { timeout: 400 });
  });
});