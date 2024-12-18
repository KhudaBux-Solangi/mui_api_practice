import React, { createContext, useState, useContext } from 'react';

// CartContext create karte hain
const CartContext = createContext();

// Custom hook jo CartContext ko use karne ka tariqa dega
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component jo app ke andar wrap hoga
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Cart ka initial state

  // Cart mein product add karna
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Cart se product ko remove karna
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Product ki quantity badhana
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Product ki quantity kam karna
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Cart ka total price calculate karna
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};


