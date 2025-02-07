import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { CartItemProps } from '@/interfaces';
import componentTextRaw from '@/locales/locales.json';
import '@/styles/components/cartItem.scss';

const CartItem: React.FC<CartItemProps> = ({ phone, onDelete }) => {
  const componentText =
    typeof componentTextRaw === 'object' ? componentTextRaw : JSON.parse(componentTextRaw as unknown as string);
  if (!phone) return null;

  const secureImageUrl = phone.imageUrl.startsWith('http://')
    ? phone.imageUrl.replace(/^http:\/\//i, 'https://')
    : phone.imageUrl;

  return (
    <div className="cart-item">
      <div className="cart-item--image">
        <Image
          src={secureImageUrl}
          alt={`${phone.brand} - ${phone.colorName}`}
          width={312}
          height={257}
          priority
          style={{ objectFit: 'contain' }}
        /> 
      </div>
      <div>
        <div className="cart-item--content">
          <p>{phone.brand}</p>
          <p>{`${phone.storage} | ${phone.colorName} `}</p>
          <br />
          <p>{phone.basePrice + 'EUR'}</p>
        </div>
        <Button variant="tertiary" onClick={() => onDelete(phone.id)}>
          <span className="cart-item--btn-color">{componentText?.cart?.buttonDeleteText || 'Eliminar'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
