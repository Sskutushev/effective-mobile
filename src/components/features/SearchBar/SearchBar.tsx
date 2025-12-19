import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Искать фильмы..."
        className="w-full rounded-full border-2 border-border bg-surface py-3 pl-12 pr-12 text-text-primary transition-all duration-200 placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
        aria-label="Искать фильмы"
        data-testid="search-input"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Очистить"
          data-testid="clear-button"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};