import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/Cart.css';
import { formatInr } from '../utils/currency';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    currentUser,
    isLoading 
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="cart-container">
        <BackgroundAnimation />
        <div className="cart-loading">
          <div className="loader"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not logged in
  if (!currentUser) {
    return (
      <div className="cart-container">
        <BackgroundAnimation />
        <div className="cart-login-prompt">
          <h2>Please Log In</h2>
          <p>You need to be logged in to view your cart.</p>
          <div className="cart-login-actions">
            <button 
              onClick={() => navigate('/login')}
              className="login-btn"
            >
              Log In
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <BackgroundAnimation />
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="continue-shopping">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <BackgroundAnimation />
      <h1>Shopping Cart - {currentUser.name}'s Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{formatInr(item.price)}</p>
              </div>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                
                <span className="quantity">{item.quantity}</span>
                
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
              
              <div className="item-total">
                {formatInr(item.price * item.quantity)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatInr(getTotalPrice())}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatInr(getTotalPrice())}</span>
          </div>
          
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
          
          <button 
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
          
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 