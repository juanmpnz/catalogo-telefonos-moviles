'use client';
import React, { useState } from 'react';
import '@/styles/components/search.scss';
import SvgRender from './SvgRender';
import svgs from '@/assets/svgs.json';
import { SearchProps } from '@/interfaces';

const Search: React.FC<SearchProps> = ({ placeholder = 'Search...', onSearch }) => {
  const { closeIcon } = svgs;
  const [query, setQuery] = useState('');

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
    <form className="search" >
      <input type="text" className="search__input" placeholder={placeholder} value={query} onChange={handleChange} />
      {query && (
        <button type="button" className="search__clear" onClick={handleClear} aria-label="Clear search">
          <SvgRender svgContent={closeIcon} size={25} />
        </button>
      )}
    </form>
  );
};

export default Search;
