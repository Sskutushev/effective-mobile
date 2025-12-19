import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@components/common/ThemeToggle/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

// Mock the useTheme hook
vi.mock('@/context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  const setTheme = vi.fn();

  beforeEach(() => {
    setTheme.mockClear();
  });

  it('renders moon icon and correct label when theme is light', () => {
    (useTheme as any).mockReturnValue({ theme: 'light', setTheme });
    render(<ThemeToggle />);
    
    expect(screen.getByLabelText('Переключить на темную тему')).toBeInTheDocument();
    expect(document.querySelector('.lucide-moon')).toBeInTheDocument();
    expect(document.querySelector('.lucide-sun')).not.toBeInTheDocument();
  });

  it('renders sun icon and correct label when theme is dark', () => {
    (useTheme as any).mockReturnValue({ theme: 'dark', setTheme });
    render(<ThemeToggle />);
    
    expect(screen.getByLabelText('Переключить на светлую тему')).toBeInTheDocument();
    expect(document.querySelector('.lucide-sun')).toBeInTheDocument();
    expect(document.querySelector('.lucide-moon')).not.toBeInTheDocument();
  });

  it('calls setTheme with "dark" when theme is light and button is clicked', () => {
    (useTheme as any).mockReturnValue({ theme: 'light', setTheme });
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when theme is dark and button is clicked', () => {
    (useTheme as any).mockReturnValue({ theme: 'dark', setTheme });
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
