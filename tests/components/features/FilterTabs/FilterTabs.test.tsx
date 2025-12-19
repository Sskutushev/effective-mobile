import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterTabs } from '@components/features/FilterTabs/FilterTabs';
import { FILTER_CATEGORIES } from '@utils/constants';

describe('FilterTabs', () => {
  const onFilterChange = vi.fn();

  it('renders all filter tabs', () => {
    render(<FilterTabs active="all" onFilterChange={onFilterChange} />);
    
    FILTER_CATEGORIES.forEach(category => {
      expect(screen.getByTestId(`filter-tab-${category.id}`)).toBeInTheDocument();
    });
  });

  it('applies active styles to the active tab', () => {
    render(<FilterTabs active="popular" onFilterChange={onFilterChange} />);
    
    const activeButton = screen.getByTestId('filter-tab-popular');
    expect(activeButton).toHaveClass('bg-primary text-white');
  });

  it('calls onFilterChange with the correct category when a tab is clicked', () => {
    render(<FilterTabs active="all" onFilterChange={onFilterChange} />);
    
    const newTab = screen.getByTestId('filter-tab-new');
    fireEvent.click(newTab);
    
    expect(onFilterChange).toHaveBeenCalledWith('new');
  });
});
