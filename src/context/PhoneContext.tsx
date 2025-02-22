'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import  { getPhones, getPhoneByName } from '@/services/api';
import { Phone } from '@/interfaces';

interface PhoneContextType {
  storedPhones: Phone[] | null;
  fetchAndSetAllPhonesData: () => Promise<void>;
  fetchAndSetPhoneByQueryData: (params: string) => Promise<void>;
  clearPhones: () => void;
  isLoading: boolean;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children, initialPhones = [] }: { children: ReactNode; initialPhones?: Phone[] }) => {
  const [storedPhones, setStoredPhones] = useState<Phone[] | null>(initialPhones);
  const [isLoading, setIsLoading] = useState(false);
 
  const fetchAndSetPhoneByQueryData = async (params: string) => {
    setIsLoading(true);
    const phones = await getPhoneByName(params);
    if (phones) setStoredPhones(phones);
    setIsLoading(false);
  };

  const fetchAndSetAllPhonesData = async () => {
    setIsLoading(true);
    try {
      const phones = await getPhones();
      if (phones) setStoredPhones(phones);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPhones = () => {
    setStoredPhones(null);
  };

  return (
    <PhoneContext.Provider
      value={{
        storedPhones,
        fetchAndSetAllPhonesData,
        fetchAndSetPhoneByQueryData,
        clearPhones,
        isLoading,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) throw new Error('usePhone debe usarse dentro de un PhoneProvider');
  return context;
};
