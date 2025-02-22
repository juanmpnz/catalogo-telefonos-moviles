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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="similar-items-container">
      <h1>{similarItemsText}</h1>
      <div className="slider-container">
        <div
          className="slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {selectedPhoneData?.similarProducts.map((element: SimilarProduct, i: number) => (
            <div key={element.id + i}>
              <Card phone={element} onClick={() => null} />
            </div>
          ))}
        </div>
        <div className="slider-bar">
          <div
            className="slider-bar-progress"
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
