'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePhonesApi } from '@/hooks/usePhonesApi';
import { ICartItem, Phone } from '@/interfaces';
import { PhoneContextType } from '@/interfaces';

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children, initialPhones = [] }: { children: ReactNode; initialPhones?: Phone[] }) => {
  const [storedPhones, setStoredPhones] = useState<Phone[]  | null>(initialPhones);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);
  const [selectedPhoneData, setSelectedPhoneData] = useState<Phone | null>(null);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getPhoneById, getPhones, getPhoneByName } = usePhonesApi();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchAndSetPhoneData = async (id: string) => {
    setIsLoading(true);
    setSelectedPhoneId(id);
    const phone = await getPhoneById(id);
    if (phone) setSelectedPhoneData(phone);
    setIsLoading(false);
  };

    const fetchAndSetPhoneByQueryData = async (params: string ) => {
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
    } catch (error) {
      console.error('Error al obtener teléfonos:', error);
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

  const addToCart = (item: ICartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <PhoneContext.Provider
      value={{
        storedPhones,
        setStoredPhones,
        selectedPhoneId,
        selectedPhoneData,
        setSelectedPhoneId,
        fetchAndSetPhoneData,
        fetchAndSetAllPhonesData,
        fetchAndSetPhoneByQueryData,
        clearSelection,
        clearPhoneData,
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhone debe usarse dentro de un PhoneProvider');
  }
  return context;
};
