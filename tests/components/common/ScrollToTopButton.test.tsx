import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollToTopButton } from '@components/common/ScrollToTopButton/ScrollToTopButton';
import { useScroll } from '@hooks/useScroll';

vi.mock('@hooks/useScroll');

describe('ScrollToTopButton', () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    scrollTo.mockClear();
    window.scrollTo = scrollTo;
  });

  it('does not render when not scrolled', () => {
    (useScroll as any).mockReturnValue(false);
    render(<ScrollToTopButton />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders when scrolled', () => {
    (useScroll as any).mockReturnValue(true);
    render(<ScrollToTopButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls window.scrollTo when clicked', () => {
    (useScroll as any).mockReturnValue(true);
    render(<ScrollToTopButton />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
