'use client';
import { ReactNode } from 'react';
import { PhoneProvider } from './PhoneContext';
import { CartProvider } from './CartContext';
import { Phone } from '@/interfaces';

interface AppProviderProps {
  children: ReactNode;
  initialPhones?: Phone[];
}

export const AppProvider = ({ children, initialPhones = [] }: AppProviderProps) => (
  <PhoneProvider initialPhones={initialPhones}>
    <CartProvider>{children}</CartProvider>
  </PhoneProvider>
);
