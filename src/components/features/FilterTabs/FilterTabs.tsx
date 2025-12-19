import React from 'react';
import { Film, Sparkles, Star, TrendingUp, Award } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { FilterCategory } from '../../../types/movie.types';
import { FILTER_CATEGORIES } from '../../../utils/constants';

interface FilterTabsProps {
  active: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const iconMap = {
  all: Film,
  new: Sparkles,
  premieres: Star,
  popular: TrendingUp,
  top50: Award,
};

export const FilterTabs: React.FC<FilterTabsProps> = ({ active, onFilterChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {FILTER_CATEGORIES.map(({ id, label }) => {
        const Icon = iconMap[id as FilterCategory];
        return (
          <button
            key={id}
            onClick={() => onFilterChange(id as FilterCategory)}
            className={cn(
              'flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200',
              active === id
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary'
            )}
            aria-current={active === id ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};