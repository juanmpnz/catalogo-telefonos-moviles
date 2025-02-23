import { Phone, SimilarProduct } from '.';

export interface ButtonProps {
  variant?: 'text' | 'primary' | 'tertiary';
  extraHeigth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface CardProps {
  phone: Phone | SimilarProduct;
  onClick?: (phone: string) => void;
}

export interface ColorOption {
  name: string;
  hexCode: string;
}

export interface ColorPickerProps {
  colors: ColorOption[];
  onColorSelect: (color: string) => void;
}

export interface SearchProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onQueryChange?:  (value: string) => void;
}

export interface SpecificationsItemProps {
  title: string;
  data: string;
}

export interface StorageProps {
  selected?: boolean;
  onClick: (storage: string) => void;
  children?: React.ReactNode;
}
 
export interface SimilarProductsProps {
  selectedPhoneData?: Phone | null;
}
