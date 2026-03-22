import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // เช็คว่ามีของชิ้นนี้ในตะกร้าหรือยัง
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // นับจำนวนชิ้นทั้งหมดในตะกร้า
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)


  // ลบตะกร้า
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  };

  // ปรับจำนวนสินค้า
  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setCartItems([]); // ล้าง State เป็นอาเรย์ว่าง
    localStorage.removeItem('cart'); // ถ้าคุณมีการเก็บไว้ใน localStorage ให้ลบออกด้วย
  }
  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, totalPrice, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext)
