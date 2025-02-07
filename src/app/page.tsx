'use client';
import Card from '@/components/Card';
import Search from '@/components/Search';
import { usePhone } from '@/context/PhonesContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import componentTexts from '@/locales/locales.json';
import '@/styles/home.scss';
 
export default function Home() {
  const router = useRouter();
  const { textResults, url } = componentTexts.home;
  const { setSelectedPhoneId, fetchAndSetAllPhonesData, fetchAndSetPhoneByQueryData, storedPhones } =
    usePhone();

  const onClick = async (id: string) => {
    setSelectedPhoneId(id);
    router.push(url);
  };

  useEffect(() => {
    if (!storedPhones?.length) {
      fetchAndSetAllPhonesData();
    }
  }, [storedPhones]);

  const onSearchPhone = (params: string) => {
    fetchAndSetPhoneByQueryData(params);
  };
 
  return (
    <div className="home-container">
      <Search onSearch={onSearchPhone} />
      <p className='home-container-search-results'> {storedPhones?.length} {textResults}</p>
      <div className="home-container-phone-items-container">
        {storedPhones?.map((e, i) => (
          <div key={e.id + i}>
            <Card phone={e} onClick={() => onClick(e.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
