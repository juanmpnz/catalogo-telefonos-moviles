'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { usePhonesApi } from '@/hooks/usePhonesApi';
import { Phone } from '@/interfaces';

interface PhoneContextType {
  storedPhones: Phone[] | null;
  selectedPhoneId: string | null;
  selectedPhoneData: Phone | null;
  fetchAndSetPhoneData: (id: string) => Promise<void>;
  fetchAndSetAllPhonesData: () => Promise<void>;
  fetchAndSetPhoneByQueryData: (params: string) => Promise<void>;
  clearSelection: () => void;
  clearPhoneData: () => void;
  setSelectedPhoneId: (p: string) => void;
  isLoading: boolean;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children, initialPhones = [] }: { children: ReactNode; initialPhones?: Phone[] }) => {
  const [storedPhones, setStoredPhones] = useState<Phone[] | null>(initialPhones);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);
  const [selectedPhoneData, setSelectedPhoneData] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getPhoneById, getPhones, getPhoneByName } = usePhonesApi();

  const fetchAndSetPhoneData = async (id: string) => {
    setIsLoading(true);
    setSelectedPhoneId(id);
    const phone = await getPhoneById(id);
    if (phone) setSelectedPhoneData(phone);
    setIsLoading(false);
  };

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

  const clearSelection = () => {
    setSelectedPhoneId(null);
    setSelectedPhoneData(null);
  };

  const clearPhoneData = () => {
    setSelectedPhoneData(null);
  };
  return (
    <PhoneContext.Provider
      value={{
        storedPhones,
        selectedPhoneId,
        selectedPhoneData,
        fetchAndSetPhoneData,
        fetchAndSetAllPhonesData,
        fetchAndSetPhoneByQueryData,
        setSelectedPhoneId,
        clearSelection,
        clearPhoneData,
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
