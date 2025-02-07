import React from 'react';
import '@/styles/components/storage.scss';
import clsx from 'clsx';
import { StorageProps } from '@/interfaces';

const Storage: React.FC<StorageProps> = ({ selected = false, onClick, children }) => {
  const storageClasses = clsx('storage', {
    'storage--selected': selected,
  });

  return (
    <div>
      <button className={storageClasses} onClick={() => onClick('e')}>
        {children || 'TEST'}
      </button>
    </div>
  );
};

export default Storage;
