'use client';
import React from 'react';
import Logo from '@/components/Icons/Logo';
import BagActive from '@/components/Icons/BagActive';
import BagInactive from '@/components/Icons/BagInactive';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);

  return (
    <header>
      <span
        role='button'
        tabIndex={0}
        onClick={() => handleNavigation('/')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigation('/')}
        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
        aria-label='Ir a inicio'
      >
        <Logo size={80} />
      </span>

      <div className='card-content-header'>
        <span
          role='button'
          tabIndex={0}
          onClick={() => handleNavigation('/cart')}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigation('/cart')}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
          aria-label='Ir al carrito'
        >
          {cart.length > 0 ? <BagActive size={24} /> : <BagInactive size={24} />}
          <span>{cart.length}</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
