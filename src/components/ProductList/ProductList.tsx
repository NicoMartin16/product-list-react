import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import { Product } from "../../interfaces/product";

type ProductListProps = {
  products: Product[];
  removedProductName: string | null;
  isReset: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
};

const ProductList = ({
  products,
  removedProductName,
  isReset,
  onAddToCart,
}: ProductListProps) => {
  
  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="product-list-container">
      <p className="product-list-container__title">Desserts</p>
      <div className="product-list-container__list">
        {products.map((item, index) => (
          <ProductItem
            isReset={isReset}
            onAddToCart={(quantity) => handleAddToCart(item, quantity)}
            onReset={item.name === removedProductName}
            {...item}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
