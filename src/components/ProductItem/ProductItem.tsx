import { useEffect, useState } from "react";
import { Image } from "../../interfaces/product";
import ButtonCount from "../ButtonCount/ButtonCount";
import './ProductItem.css';

type ProductItemProps = {
  image: Image;
  name: string;
  category: string;
  price: number;
  onReset: boolean;
  isReset: boolean;
  onAddToCart: (quantity: number) => void;
};

const ProductItem = ({name, image, category, price, onReset, isReset, onAddToCart}: ProductItemProps) => {

  const [quantity, setQuantity] = useState<number>(0);

  const handleOnChangeQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    onAddToCart(newQuantity);
  }
  
  useEffect(() => {
    if(onReset) {
      setQuantity(0);
    }
  }, [onReset]);

  useEffect(() => {
    if(isReset) {
      setQuantity(0);
    }
  }, [isReset])

    return (    <div className="product-item">
      <div className="product-image">
        <img src={image.desktop} alt={name} />
      </div>
      <ButtonCount isReset={isReset} currentQuantity={quantity} onReset={onReset} onChangeQuantity={handleOnChangeQuantity}/>
      <div className="product-info">
        <p className="product-category rose-500">{category}</p>
        <p className="product-name rose-900">{name}</p>
        <p className="product-price red">${price}</p>
      </div>
    </div>
  )
};

export default ProductItem;
