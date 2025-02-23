'use client';
import Card from '@/components/Card';
import Search from '@/components/Search';
import Link from 'next/link';
import hash from 'object-hash';
import componentTexts from '@/locales/locales.json';
import { usePhone } from '@/context/PhoneContext';
import { useEffect, useState } from 'react';
import './home.scss';

export default function Home() {
  const { textResults } = componentTexts.translations.home;
  const { fetchAndSetAllPhonesData, fetchAndSetPhoneByQueryData, storedPhones } = usePhone();

  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!storedPhones?.length && !isSearching) {
      fetchAndSetAllPhonesData();
    }
  }, [storedPhones]);

  const onSearchPhone = (params: string) => {
    setQuery(params);
    setIsSearching(params.length > 0);
    fetchAndSetPhoneByQueryData(params);
  };

  return (
    <div className='home-container'>
      <Search onSearch={onSearchPhone} onQueryChange={setQuery} />
      <p className="home-container-search-results">
  {isSearching && !storedPhones?.length
    ? 'No hay resultados para tu búsqueda.'
    : storedPhones?.length !== 0
    ? `${storedPhones?.length} ${textResults}`
    : ''}
</p>

      <div className='home-container-phone-items-container'>
        {storedPhones?.length
          ? storedPhones.map(e => (
              <Link key={hash(Math.random())} href={`/product/${e.id}`}>
                <Card phone={e} />
              </Link>
            ))
          : isSearching && <div />}
      </div>
    </div>
  );
}
