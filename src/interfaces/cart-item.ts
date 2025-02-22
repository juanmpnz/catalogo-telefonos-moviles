import { Phone } from './index';

export interface ICartItem {
  id: string;
  brand: string;
  basePrice: number;
  quantity: number;
  imageUrl: string;
  storage: string;
  colorName: string;
}

export interface PhoneContextType {
  storedPhones: Phone[] | null;
  setStoredPhones: (phones: Phone[]) => void;
  selectedPhoneId: string | null;
  selectedPhoneData: Phone | null;
  setSelectedPhoneId: (id: string) => void;
  fetchAndSetPhoneData: (id: string) => Promise<void>;
  fetchAndSetAllPhonesData: () => Promise<void>;
  fetchAndSetPhoneByQueryData: (params: string) => Promise<void>;
  clearSelection: () => void;
  clearPhoneData: () => void;
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

export interface CartItemProps {
  phone: ICartItem;
  onDelete: (id: string) => void;
}

