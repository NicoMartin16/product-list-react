import { useEffect, useState } from "react";
import "./ButtonCount.css";

type ButtonCountProps = {
  onChangeQuantity: (value: number) => void;
  currentQuantity: number;
  onReset: boolean;
  isReset: boolean;
};

const ButtonCount = ({
  onChangeQuantity,
  onReset,
  isReset,
  currentQuantity,
}: ButtonCountProps) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (onReset) {
      setCount(0);
      setIsInCart(false);
    }
  }, [onReset]);

  useEffect(() => {
    if (currentQuantity === 0) {
      setIsInCart(false);
      setCount(0);
    } else if (currentQuantity !== count) {
      setCount(currentQuantity);
      setIsInCart(true);
    }
  }, [currentQuantity, count]);

  useEffect(() => {
    if (isReset) {
      setCount(0);
      setIsInCart(false);
      onChangeQuantity(0);
    }
  }, [isReset, onChangeQuantity]);

  const handleAddToCart = () => {
    setIsInCart(true);
    setCount(count + 1);
    onChangeQuantity(count + 1);
  };
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChangeQuantity(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount <= 0) {
      setIsInCart(false);
      setCount(0);
      onChangeQuantity(0);
    } else {
      setCount(newCount);
      onChangeQuantity(newCount);
    }
  };

  return isInCart ? (
    <div className="count_cart bg-red">
      {" "}
      <button onClick={handleDecrement} className="decrement bg-red">
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt="decrement-icon"
        />
      </button>
      <p>{count}</p>{" "}
      <button onClick={handleIncrement} className="increment bg-red">
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt="increment-icon"
        />
      </button>
    </div>
  ) : (
    <button onClick={handleAddToCart} className="add_cart">
      <img src="/assets/images/icon-add-to-cart.svg" alt="add-icon" />
      <p>Add to cart</p>
    </button>
  );
};

export default ButtonCount;
