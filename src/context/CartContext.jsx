import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import userCartsData from '../data/userCarts.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useContext(AuthContext);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    try {
      const cartKey = currentUser ? `cart_${currentUser.id}` : 'cart';
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else if (currentUser) {
        // For new logged-in users, try to load from userCarts.json
        const userCart = userCartsData.userCarts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          setCartItems(userCart.cartItems);
          // Save to localStorage for future use
          localStorage.setItem(cartKey, JSON.stringify(userCart.cartItems));
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Save cart items whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        const cartKey = currentUser ? `cart_${currentUser.id}` : 'cart';
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cartItems, currentUser, isLoading]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showNotification(`${product.name} quantity updated in cart`);
        return updatedItems;
      }
      
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      showNotification(`${product.name} added to cart`);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      const updatedItems = prevItems.filter(item => item.id !== productId);
      if (itemToRemove) {
        showNotification(`${itemToRemove.name} removed from cart`);
      }
      return updatedItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      if (item) {
        showNotification(`${item.name} quantity updated to ${quantity}`);
      }
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showNotification('Cart cleared');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      notification,
      currentUser,
      isLoading
    }}>
      {children}
      {notification && (
        <div className="cart-notification">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 