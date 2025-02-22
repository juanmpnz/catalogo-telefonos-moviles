import React from 'react';

const Logo: React.FC<{ size?: number }> = ({ size = 77 }) => (
  <svg width={size} height={(size * 30) / 77} viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8454 9.23917C11.485 7.857 9.59259 7 7.5 7C3.35786 7 0 10.3579 0 14.5C0 18.6421 3.35786 22 7.5 22C9.50619 22 11.3284 21.2123 12.6742 19.9293C11.6202 18.4554 11 16.6501 11 14.7C11 12.6465 11.6877 10.7536 12.8454 9.23917Z" fill="black" />
    <path d="M18.4365 7.42969H21.5798V22.0011H18.4365V7.42969Z" fill="black" />
    <path d="M27.2939 13.1445V16.2878H12.7225V13.1445H27.2939Z" fill="black" />
    <path d="M24.0488 8.45312L26.2715 10.6757L15.9679 20.9793L13.7453 18.7567L24.0488 8.45312Z" fill="black" />
    <path d="M26.2715 18.7578L24.0489 20.9804L13.7453 10.6769L15.9679 8.45426L26.2715 18.7578Z" fill="black" />
  </svg>
);

export default Logo;
