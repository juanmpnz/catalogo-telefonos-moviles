'use client';
import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Icons/Logo';
import BagActive from '@/components/Icons/BagActive';
import BagInactive from '@/components/Icons/BagInactive';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header>
      <Link href='/' aria-label='Ir a inicio' style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <Logo size={80} />
      </Link>

      <div className='card-content-header'>
        <Link href='/cart' aria-label='Ir al carrito' style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          {cart.length > 0 ? <BagActive size={24} /> : <BagInactive size={24} />}
          <span>{cart.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
