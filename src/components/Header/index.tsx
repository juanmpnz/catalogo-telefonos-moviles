'use client';
import React from 'react';
import SvgRender from '../SvgRender';
import svgs from '@/assets/svgs.json';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { logoSvg, bagActiveSvg, bagInactiveSvg } = svgs;
  const { cart } = useCart();
  const router = useRouter();
  return (
    <header>
      <SvgRender svgContent={logoSvg} onClick={() => router.push('/')} />
      <div className="card-content-header">
        <SvgRender
          svgContent={cart.length ? bagActiveSvg : bagInactiveSvg}
          size={18}
          onClick={() => router.push('/cart')}
        />
        <span>{cart.length}</span>
      </div>
    </header>
  );
};

export default Header;
