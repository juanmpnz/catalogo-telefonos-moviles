import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@/interfaces';
import './button.scss';

const Button: React.FC<ButtonProps> = ({ variant = 'text', extraHeigth = false, disabled = false, onClick, children }) => {
  const buttonClasses = clsx('button', {
    'button--text': variant === 'text',
    'button--primary': variant === 'primary',
    'button--tertiary': variant === 'tertiary',
    'button--extra-height': extraHeigth,
    'button--disabled': disabled,
  });
  return (
    <button className={buttonClasses} onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
};

export default Button;
