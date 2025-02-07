'use client';
import { usePhone } from '@/context/PhonesContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICartItem, PhoneSpecs } from '@/interfaces';
import Storage from '@/components/Storage';
import ColorPicker from '@/components/ColorPicker';
import Button from '@/components/Button';
import SpecificationItem from '@/components/SpecificationItem';
import SimilarProducts from '@/components/SimilarProducts';
import componentText from '@/locales/locales.json';
import Loading from '@/components/Loading';
import Image from 'next/image';
import '@/styles/product.scss';

const translations: { [K in keyof PhoneSpecs]: string } = {
  screen: 'pantalla',
  resolution: 'resolución',
  processor: 'procesador',
  mainCamera: 'cámara principal',
  selfieCamera: 'cámara frontal',
  battery: 'batería',
  os: 'sistema operativo',
  screenRefreshRate: 'frecuencia de actualización',
};

const PhoneDetail = () => {
  const { priceForm, currency, storageText, pickColorText, buttonText, specificationsText } = componentText.product;
  const { selectedPhoneId, selectedPhoneData, fetchAndSetPhoneData, isLoading, clearPhoneData, addToCart } = usePhone();
  const router = useRouter();
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [dataCart, setDataCart] = useState<ICartItem | null>(null);
  const [image, setImage] = useState(selectedPhoneData?.colorOptions[0].imageUrl);

  const secureImageUrl = image?.startsWith('http://') ? image.replace(/^http:\/\//i, 'https://') : image;

  const translatedSpecs =
    (selectedPhoneData &&
      Object.entries(selectedPhoneData.specs).reduce<Record<string, string>>((acc, [key, value]) => {
        const translatedKey = translations[key as keyof typeof translations] || key;
        acc[translatedKey] = value || 'Sin información';
        return acc;
      }, {})) ||
    {};

  const handlePickerColor = (color: string) => {
    const selectedColorOption = selectedPhoneData?.colorOptions.find(
      (option) => option.hexCode.toLowerCase() === color.toLowerCase(),
    );
    if (selectedColorOption) {
      setImage(selectedColorOption.imageUrl);

      setDataCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          imageUrl: selectedColorOption.imageUrl,
          colorName: selectedColorOption.name,
        };
      });
    }
  };

  const handleStorageSelection = (storage: string) => {
    setSelectedStorage(storage);
    setDataCart((prev) => (prev ? { ...prev, storage } : prev));
  };

  useEffect(() => {
    if (selectedPhoneData) {
      setImage(selectedPhoneData.colorOptions[0].imageUrl);

      setSelectedStorage(selectedPhoneData.storageOptions[0].capacity);
      setDataCart({
        id: selectedPhoneData.id,
        brand: selectedPhoneData.name,
        basePrice: selectedPhoneData.basePrice,
        quantity: 1,
        imageUrl: selectedPhoneData?.colorOptions[0].imageUrl,
        storage: selectedPhoneData.storageOptions[0].capacity,
        colorName: selectedPhoneData?.colorOptions[0].name,
      });
    }
  }, [selectedPhoneData]);

  const handleAddToCart = () => {
    if (dataCart) {
      addToCart(dataCart);
      router.push('/cart');
    }
  };

  useEffect(() => {
    if (!selectedPhoneId) {
      router.push('/');
      return;
    }
    if (!selectedPhoneData) {
      fetchAndSetPhoneData(selectedPhoneId);
    }

    return () => {
      clearPhoneData();
    };
  }, [selectedPhoneId]);

  return (
    <div className="product-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="product-container--image-detail-container">
            <div className="product-container--image">
              {image ? (
                <Image
                  src={secureImageUrl || image}
                  alt={selectedPhoneData?.name || 'Phone'}
                  width={510}
                  height={630}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <Loading />
              )}
            </div>
            <div className="product-container--detail">
              <div className="product-container--detail--title">
                <p>{selectedPhoneData?.name}</p>
                <p>{`${priceForm} ${selectedPhoneData?.basePrice} ${currency}`}</p>
              </div>
              <div className="product-container--detail--storage-title">
                <p>{storageText}</p>
                <div className="product-container--detail--storage-data">
                  {selectedPhoneData?.storageOptions.map((element, i) => (
                    <div key={element.capacity + i}>
                      <Storage
                        selected={selectedStorage === element.capacity}
                        onClick={() => handleStorageSelection(element.capacity)}
                      >
                        {element.capacity}
                      </Storage>
                    </div>
                  ))}
                </div>
                <div className="product-container--detail--color-picker">
                  <ColorPicker
                    onColorSelect={handlePickerColor}
                    colors={selectedPhoneData?.colorOptions || [{ name: '', hexCode: '' }]}
                  />
                  <p>{pickColorText}</p>
                </div>
                <Button
                  variant="primary"
                  extraHeigth={true}
                  onClick={handleAddToCart}
                  disabled={!image || !selectedStorage}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
          <div className="product-container--specifications">
            <h1>{specificationsText}</h1>
            {translatedSpecs &&
              Object.entries(translatedSpecs).map(([key, value]) => (
                <SpecificationItem key={key} title={key} data={value} />
              ))}
          </div>
          <SimilarProducts selectedPhoneData={selectedPhoneData} />
        </>
      )}
    </div>
  );
};

export default PhoneDetail;
