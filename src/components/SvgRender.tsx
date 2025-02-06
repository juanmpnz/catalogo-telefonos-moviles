import { SvgRenderProps } from '@/interfaces';
import React from 'react';

const SvgRender: React.FC<SvgRenderProps> = ({ size = 24, color = 'black', svgContent, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        fill: color,
        cursor: onClick && 'pointer',
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgRender;
