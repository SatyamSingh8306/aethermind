import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import '../styles/ProductDetailPage.css';
import BackgroundAnimation from '../components/BackgroundAnimation';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddToCartEffect, setShowAddToCartEffect] = useState(false);
  
  useEffect(() => {
    // Find the product with the matching id
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    
    // Simulate loading delay
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    }, 300);
  }, [id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      
      // Show success effect
      setShowAddToCartEffect(true);
      setTimeout(() => {
        setShowAddToCartEffect(false);
      }, 2000);
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-detail-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <BackgroundAnimation />
      
      <div className="product-detail-container">
        <div className="product-breadcrumb">
          <Link to="/products">Products</Link> / {product.name}
        </div>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image || '/images/product-placeholder.jpg'} alt={product.name} />
          </div>
          
          <div className="product-detail-info">
            <span className="product-category-badge">{product.category}</span>
            <h1>{product.name}</h1>
            
            <div className="product-price-section">
              <h2 className="product-price">{product.price.toFixed(2)}</h2>
              
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="quantity-input"
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="quantity-btn"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>

              <button 
                className={`add-to-cart-btn ${showAddToCartEffect ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="cart-icon" />
                {showAddToCartEffect ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features && product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="product-cta">
              <Link to="/contact" className="contact-btn">
                Contact Sales
              </Link>
              <p className="product-support-text">
                Need more information? Our team is ready to help you implement this solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;