import React from 'react';
import '@/styles/components/specificationItem.scss';
import { SpecificationsItemProps } from '@/interfaces';

const SpecificationItem: React.FC<SpecificationsItemProps> = ({ title, data }) => {
  return (
    <div className="specification-item">
      <div className="specification-item--title">
        <p>{title}</p>
      </div>
      <div className="specification-item--info">
        <p>{data}</p>
      </div>
    </div>
  );
};

export default SpecificationItem;
