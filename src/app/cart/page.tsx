'use client';
import './cart.scss';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';
import { usePhone } from '@/context/PhonesContext';
import { ICartItem } from '@/interfaces';
import { useRouter } from 'next/navigation';
import componentText from '@/locales/locales.json';

export default function Cart() {
  const router = useRouter();
  const { title, buttonText, buttonTextSecond, currency, totalText } = componentText.cart;
  const { cart, removeFromCart, clearCart } = usePhone();
  const total = cart.reduce((acc, item) => acc + item.basePrice, 0);

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="cart-container">
      <div className="cart-container--title">
        <h1> {`${title} (${cart.length})`}</h1>
      </div>
      <div>
        {cart.map((e: ICartItem, i) => {
          return (
            <span key={i}>
              <CartItem phone={e} onDelete={removeFromCart} />
            </span>
          );
        })}
      </div>
      <div className="cart-container--footer">
        <div className="cart-container--footer--content">
          <span className="button-w">
            <Button variant="text" onClick={handleClick} extraHeigth>
              {buttonText}
            </Button>
          </span>
          <div className="cart-container--footer--total">
            <p>{`${totalText} ${total} ${currency}`}</p>
            <span className="button-w">
              <Button variant="primary" onClick={clearCart}>
                {buttonTextSecond}
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
