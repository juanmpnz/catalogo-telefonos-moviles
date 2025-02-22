'use client';
import Card from '@/components/Card';
import Search from '@/components/Search';
import Link from 'next/link';
import hash from 'object-hash';
import componentTexts from '@/locales/locales.json';
import { usePhone } from '@/context/PhoneContext';
import { useEffect } from 'react';
import './home.scss';

export default function Home() {
  const { textResults } = componentTexts.translations.home;
  const { fetchAndSetAllPhonesData, fetchAndSetPhoneByQueryData, storedPhones } = usePhone();

  useEffect(() => {
    if (!storedPhones?.length) {
      fetchAndSetAllPhonesData();
    }
  }, [storedPhones]);

  const onSearchPhone = (params: string) => {
    fetchAndSetPhoneByQueryData(params);
  };

  return (
    <div className='home-container'>
      <Search onSearch={onSearchPhone} />
      <p className='home-container-search-results'>
        {storedPhones?.length} {textResults}
      </p>
      <div className='home-container-phone-items-container'>
        {storedPhones?.map(e => (
          <Link key={hash(Math.random())} href={`/product/${e.id}`}>
            <Card phone={e} />
          </Link>
        ))}
      </div>
    </div>
  );
}
