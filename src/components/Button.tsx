import React from 'react';
import clsx from 'clsx';
import '@/styles/components/button.scss';
import { ButtonProps } from '@/interfaces';

const Button: React.FC<ButtonProps> = ({
  variant = 'text',
  extraHeigth = false,
  disabled = false,
  onClick,
  children,
}) => {
  const buttonClasses = clsx('button', {
    'button--text': variant === 'text',
    'button--primary': variant === 'primary',
    'button--tertiary': variant === 'tertiary',
    'button--extra-height': extraHeigth,
    'button--disabled': disabled,
  });
  return (
    <button className={buttonClasses} onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default Button;
