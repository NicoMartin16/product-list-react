import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList/ProductList";

import "./App.css";
import ModalConfirm from "./components/ModalConfirm/ModalConfirm";
import { useEffect, useState } from "react";
import { Product } from "./interfaces/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [removedProductName, setRemovedProductName] = useState<string | null>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  const getProducts = async () => {
    // Usar la base URL definida en vite.config.ts
    const baseUrl = import.meta.env.BASE_URL || '';
    const response = await fetch(`${baseUrl}data.json`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchProducts = await getProducts();
      return fetchProducts;
    };

    fetchData().then((resp) => {
      setProducts(resp);
    });
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    const productWithQuantity = { ...product, quantity };

    const existingProductIndex = productsInCart.findIndex(
      (item) => item.name === product.name
    );

    if (quantity === 0) {
      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsInCart];
        updatedProducts.splice(existingProductIndex, 1);
        setProductsInCart(updatedProducts);
      }
      return;
    }

    if (existingProductIndex !== -1) {
      const updatedProducts = [...productsInCart];
      updatedProducts[existingProductIndex].quantity = quantity;
      setProductsInCart(updatedProducts);
    } else {
      setProductsInCart((currentProducts) => [
        ...currentProducts,
        productWithQuantity,
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const productToRemove = productsInCart[index];
    const updatedProducts = [...productsInCart];
    updatedProducts.splice(index, 1);
    
    setProductsInCart(updatedProducts);

    setRemovedProductName(productToRemove.name);

    return productToRemove.name;
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductsInCart([]);
    setRemovedProductName(null);
    setIsReset(true);
  };

  useEffect(() => {
    if (removedProductName) {
      const timer = setTimeout(() => {
        setRemovedProductName(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [removedProductName]);
  
  useEffect(() => {
    if (isReset) {
      const timer = setTimeout(() => {
        setIsReset(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReset]);

  return (
    <div className="app-container">
      <ProductList
        isReset={isReset}
        removedProductName={removedProductName}
        onAddToCart={handleAddToCart}
        products={products}
        
      />
      <Cart onConfirmOrder={handleConfirmOrder}  onRemoveItem={handleRemoveItem} productsSelected={productsInCart} />
      {
        isModalOpen && (<ModalConfirm productsSelected={productsInCart} onClose={handleCloseModal} />)
      }
    </div>
  );
}

export default App;
