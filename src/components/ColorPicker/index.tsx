import { useState } from 'react';
import './colorPicker.scss';
import { ColorOption, ColorPickerProps } from '@/interfaces';

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: ColorOption) => {
    setSelectedColor(color.hexCode);
    onColorSelect(color.hexCode);
  };

  return (
    <div className='color-picker'>
      {colors.map(color => (
        <button
          key={color.hexCode}
          className={`color-picker--color-box ${selectedColor === color.hexCode ? 'selected' : ''}`}
          style={{
            backgroundColor: color.hexCode,
            border: selectedColor === color.hexCode ? '2px solid grey' : '1px solid rgba(204, 204, 204, 1)',
          }}
          onClick={() => handleSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
