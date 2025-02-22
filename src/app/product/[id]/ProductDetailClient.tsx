"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ColorOption, ICartItem, Phone, PhoneSpecs, StorageOption } from "@/interfaces";
import Storage from "@/components/Storage";
import ColorPicker from "@/components/ColorPicker";
import Button from "@/components/Button";
import SpecificationItem from "@/components/SpecificationItem";
import SimilarProducts from "@/components/SimilarProducts";
import Image from "next/image";
import Loading from "@/components/Loading";
import componentText from "@/locales/locales.json";
import config from "@/config/config.json";
import hash from "object-hash";
import './product.scss'

interface IProductDetailClientProps {
  phone: Phone;
}

const translations: { [K in keyof PhoneSpecs]: string } = {
  screen: componentText.translations.phoneSpecs.screen,
  resolution: componentText.translations.phoneSpecs.resolution,
  processor: componentText.translations.phoneSpecs.processor,
  mainCamera: componentText.translations.phoneSpecs.mainCamera,
  selfieCamera: componentText.translations.phoneSpecs.selfieCamera,
  battery: componentText.translations.phoneSpecs.battery,
  os: componentText.translations.phoneSpecs.os,
  screenRefreshRate: componentText.translations.phoneSpecs.screenRefreshRate,
};

const ProductDetailClient = ({ phone }: IProductDetailClientProps) => {
  const { priceForm, storageText, pickColorText, buttonText, specificationsText } =
    componentText.translations.product;
  const { currency } = config.configurations.product;
  const { addToCart } = useCart();

  const [selectedStorage, setSelectedStorage] = useState(phone.storageOptions[0]?.capacity);
  const [image, setImage] = useState(phone.colorOptions[0]?.imageUrl);
  const [dataCart, setDataCart] = useState<ICartItem>({
    id: phone.id,
    brand: phone.name,
    basePrice: phone.basePrice,
    quantity: 1,
    imageUrl: phone.colorOptions[0]?.imageUrl,
    storage: phone.storageOptions[0]?.capacity,
    colorName: phone.colorOptions[0]?.name,
  });

  const secureImageUrl = image?.startsWith("http://")
    ? image.replace(/^http:\/\//i, "https://")
    : image;

    const translatedSpecs = Object.entries(phone.specs).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        const translatedKey = translations[key as keyof typeof translations] || key;
        acc[translatedKey] = value ? String(value) : "Sin información";
        return acc;
      },
      {}
    );
    

  const handlePickerColor = (color: string) => {
    const selectedColorOption = phone.colorOptions.find(
      (option: ColorOption) => option.hexCode.toLowerCase() === color.toLowerCase()
    );
    if (selectedColorOption) {
      setImage(selectedColorOption.imageUrl);
      setDataCart((prev) =>
        prev
          ? {
              ...prev,
              imageUrl: selectedColorOption.imageUrl,
              colorName: selectedColorOption.name,
            }
          : prev
      );
    }
  };

  const handleStorageSelection = (storage: string) => {
    setSelectedStorage(storage);
    setDataCart((prev) => (prev ? { ...prev, storage } : prev));
  };

  const handleAddToCart = () => {
    if (dataCart) {
      addToCart(dataCart);
    }
  };

  return (
    <div className="product-container">
      <div className="product-container--image-detail-container">
        <div className="product-container--image">
          {image ? (
            <Image
              src={secureImageUrl || image}
              alt={phone.name || "Phone"}
              width={510}
              height={630}
              priority
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Loading />
          )}
        </div>
        <div className="product-container--detail">
          <div className="product-container--detail--title">
            <p>{phone.name}</p>
            <p>{`${priceForm} ${phone.basePrice} ${currency}`}</p>
          </div>
          <div className="product-container--detail--storage-title">
            <p>{storageText}</p>
            <div className="product-container--detail--storage-data">
              {phone.storageOptions.map((element: StorageOption) => (
                <div key={hash(element.capacity)}>
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
                colors={phone.colorOptions || [{ name: "", hexCode: "" }]}
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
        {Object.entries(translatedSpecs).map(([key, value]) => (
          <SpecificationItem key={key} title={key} data={value} />
        ))}
      </div>
      <SimilarProducts selectedPhoneData={phone} />
    </div>
  );
};

export default ProductDetailClient;
