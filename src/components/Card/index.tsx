import React from 'react';
import { CardProps } from '@/interfaces';
import Image from 'next/image';
import './card.scss';

const Card: React.FC<CardProps> = ({ phone, onClick }) => {
  const secureImageUrl = phone.imageUrl?.startsWith('http://') ? phone.imageUrl.replace(/^http:\/\//i, 'https://') : phone.imageUrl;
  return (
    <span onClick={() => onClick && onClick(phone.id)}>
      <div className='card'>
        <div className='card--card-image'>
          <Image src={secureImageUrl} alt={`${phone.brand} - ${phone.name}`} width={312} height={257} priority style={{ objectFit: 'contain' }} />
        </div>
        <div className='card--card-footer'>
          <div className='card--card-footer--content'>
            <p>{phone.brand}</p>
            <h1>{phone.name}</h1>
          </div>
          <div className='card--card-footer--content--price'>
            <h1>{phone.basePrice + 'EUR'}</h1>
          </div>
        </div>
      </div>
    </span>
  );
};

export default Card;
