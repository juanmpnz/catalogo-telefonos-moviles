'use client';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card';
import componentText from '@/locales/locales.json';
import { SimilarProduct, SimilarProductsProps } from '@/interfaces';
import './similarItem.scss';

const SimilarProducts: React.FC<SimilarProductsProps> = ({ selectedPhoneData }) => {
  const { similarItemsText } = componentText.translations.product;
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
 
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      const percentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollPercentage(percentage);
    };

    slider.addEventListener('scroll', handleScroll);
    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className='similar-items-container'>
      <h1>{similarItemsText}</h1>
      <div className='slider-container'>
        <div
          className='slider'
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          {selectedPhoneData?.similarProducts.map((element: SimilarProduct) => (
            <div key={element.id}>
              <Card phone={element} onClick={() => null} />
            </div>
          ))}
        </div>
        <div className='slider-bar'>
          <div
            className='slider-bar-progress'
            style={{
              width: `${scrollPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
