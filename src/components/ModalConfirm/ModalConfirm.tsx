import { Product } from "../../interfaces/product";
import './ModalConfirm.css';

export type ModalConfirmProps = {
  onClose: () => void;
  productsSelected: Product[];
}

const ModalConfirm = ({onClose, productsSelected}: ModalConfirmProps) => {

  const handleOnClose = () => {
    onClose();
  }

  return (
    <div className="overlay">
      <div className="modal-confirm">        <div className="container-icon">
          <img src="/assets/images/icon-order-confirmed.svg" alt="order-confirmed" />
        </div>
        <div className="container-title">
          <p className="title rose-900">Order Confirmed</p>
          <p className="subtitle rose-500">We hope you enjoy your food</p>
        </div>
        <div className="container-products bg-rose-100">
          {
            productsSelected.map((product, index) => (
              <div key={index} className="product">
                <div className="product-info">                <div className="container-image">
                    <img src={product.image.desktop} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <p className="product-name rose-500">{product.name}</p>
                    <p className="product-quantity red">{product.quantity}x</p>
                    <p className="product-price rose-300">@${product.price}</p>
                  </div>
                </div>
                <div className="product-total">
                  <p className="product-total-price rose-900">${(product.price * (product.quantity || 0)).toFixed(2)}</p>
                </div>
              </div>
            ))
          }
          <div className="total">
            <p className="total-price rose-500">Order total</p>
            <p className="total-price-value rose-900">
              ${productsSelected.reduce((acc, product) => acc + (product.price * (product.quantity || 0)), 0).toFixed(2)}
            </p>
          </div>
        </div>

        <button className="button-new-order bg-red" onClick={handleOnClose}>Start New Order</button>
      </div>
    
    </div>
  )
}

export default ModalConfirm