import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import '../styles/ProductDetailPage.css';
import BackgroundAnimation from '../components/BackgroundAnimation';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the product with the matching id
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    
    // Simulate loading delay
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="back-btn">Return to Products</Link>
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
              <h2 className="product-price">${product.price.toFixed(2)}</h2>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
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