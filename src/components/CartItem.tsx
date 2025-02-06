import React from 'react';
import { CartItemProps } from '@/interfaces';
import componentText from '@/locales/locales.json';
import Button from './Button';

import '../styles/components/cartItem.scss';

const CartItem: React.FC<CartItemProps> = ({ phone, onDelete }) => {
  const { buttonDeleteText } = componentText.cart;
  return (
    <div className="cart-item">
      <div className="cart-item--image">
        <img src={phone.imageUrl} alt="Phone" width={312} height={257}  loading="eager"  style={{ objectFit: 'contain' }} />
      </div>
      <div>
        <div className="cart-item--content">
          <p>{phone.brand}</p>
          <p>{`${phone.storage} | ${phone.colorName} `}</p>
          <br />
          <p>{phone.basePrice + 'EUR'}</p>
        </div>
        <Button variant="tertiary" onClick={() => onDelete(phone.id)}>
          <span className="cart-item--btn-color">{buttonDeleteText}</span>{' '}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
