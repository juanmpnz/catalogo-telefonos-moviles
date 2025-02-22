import React from 'react';
import './storage.scss';
import clsx from 'clsx';
import { StorageProps } from '@/interfaces';

const Storage: React.FC<StorageProps> = ({ selected = false, onClick, children }) => {
  const storageClasses = clsx('storage', {
    'storage--selected': selected,
  });

  return (
    <div>
      <button
        className={storageClasses}
        onClick={() => onClick(children?.toString() ?? '')} 
        aria-pressed={selected} 
        aria-label={`Seleccionar almacenamiento ${children ?? ''}`} 
      >
        {children} 
      </button>
    </div>
  );
};

export default Storage;
