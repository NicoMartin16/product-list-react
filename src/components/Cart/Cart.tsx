import { Product } from "../../interfaces/product";
import "./Cart.css";
import { MouseEvent } from "react";

type CartProps = {
  productsSelected: Product[];
  onRemoveItem: (index: number) => void;
  onConfirmOrder: () => void;
};

const Cart = ({
  productsSelected,
  onRemoveItem,
  onConfirmOrder,
}: CartProps) => {
  const getTotalPerProduct = (price: number, quantity: number | undefined) => {
    return price * (quantity || 0);
  };

  const getTotal = () => {
    let total = 0;
    productsSelected.forEach((item) => {
      total += getTotalPerProduct(item.price, item.quantity);
    });
    return total;
  };
  const removeItemFromCart = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    onRemoveItem(index);
  };

  const handleConfirmOrder = () => {
    onConfirmOrder();
  };

  return (
    <div className="cart">
      <p className="title red">Your Cart({productsSelected.length})</p>
      <div className="cart-container">
        {productsSelected && productsSelected.length > 0 ? (
          <>
            {productsSelected.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-item-info">
                  <p className="name rose-900">{item.name}</p>
                  <p className="quantity red">{item.quantity}x</p>
                  <p className="unit-price rose-300">@${item.price}</p>
                  <p className="total-price rose-500">
                    ${getTotalPerProduct(item.price, item.quantity)}
                  </p>
                </div>
                <div
                  onClick={(e) => removeItemFromCart(e, index)}
                  className="cart-item-remove"
                >
                  {" "}
                  <img
                    src="/assets/images/icon-remove-item.svg"
                    alt="remove-item"
                  />
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p className="total-title rose-500">Order Total</p>
              <p className="amount rose-900">${getTotal()}</p>
            </div>
            <div className="cart-message bg-rose-100">
              {" "}
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt="carbon-neutral"
              />
              <p className="rose-300">
                This is a <b className="rose-500">carbon-neutral</b> delivery
              </p>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="button-confirm bg-red"
            >
              Confirm order
            </button>
          </>
        ) : (
          <div>
            <div className="cart-empty">
              {" "}
              <img
                src="/assets/images/illustration-empty-cart.svg"
                alt="empty-cart"
              />
              <p className="rose-500">Your added items will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
