'use client';
import React, { useState, useEffect } from 'react';
import { SearchProps } from '@/interfaces';
import CloseIcon from '../Icons/CloseIcon';
import './search.scss';

const Search: React.FC<SearchProps> = ({ placeholder = 'Search...', onSearch, onQueryChange }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (onQueryChange) onQueryChange(query);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form className="search">
      <input
        type="text"
        className="search__input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button type="button" className="search__clear" onClick={handleClear} aria-label="Clear search">
          <CloseIcon />
        </button>
      )}
    </form>
  );
};

export default Search;
