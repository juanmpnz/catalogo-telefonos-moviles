import React from 'react';
import { CardProps } from '@/interfaces';

import '../styles/components/card.scss';

const Card: React.FC<CardProps> = ({ phone, onClick }) => {
  return (
    <span onClick={() => onClick(phone.id)}>
      <div className="card">
        <div className="card--card-image">
          <img
            src={phone.imageUrl}
            alt="Phone"
            width={312}
            height={257}
            loading="eager"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="card--card-footer">
          <div className="card--card-footer--content">
            <p>{phone.brand}</p>
            <h1>{phone.name}</h1>
          </div>
          <div className="card--card-footer--content--price">
            <h1>{phone.basePrice + 'EUR'}</h1>
          </div>
        </div>
      </div>
    </span>
  );
};

export default Card;
