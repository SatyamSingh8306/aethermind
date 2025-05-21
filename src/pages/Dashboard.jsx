import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBookmark, FaHistory, FaCog, FaBell, FaChartLine, FaFileAlt, FaQuestionCircle, FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { cartItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const userStats = [
    { title: 'Cart Items', value: cartItems.length.toString(), icon: <FaShoppingCart />, color: '#6366F1' },
    { title: 'Saved Items', value: '12', icon: <FaBookmark />, color: '#10B981' },
    { title: 'Recent Activity', value: '8', icon: <FaHistory />, color: '#F59E0B' },
    { title: 'Documents', value: '5', icon: <FaFileAlt />, color: '#EC4899' }
  ];

  const recentActivity = [
    { id: 1, action: 'Document Viewed', time: '2 hours ago', status: 'completed', details: 'Viewed product documentation' },
    { id: 2, action: 'Profile Updated', time: '1 day ago', status: 'completed', details: 'Updated contact information' },
    { id: 3, action: 'Support Ticket', time: '2 days ago', status: 'pending', details: 'Submitted technical support request' }
  ];

  const quickLinks = [
    { title: 'Documentation', icon: <FaFileAlt />, link: '/documentation', color: '#6366F1' },
    { title: 'Support', icon: <FaQuestionCircle />, link: '/support', color: '#10B981' },
    { title: 'Settings', icon: <FaCog />, link: '/settings', color: '#F59E0B' },
    { title: 'Profile', icon: <FaUser />, link: '/profile', color: '#EC4899' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.name}!</h1>
          <p>Here's your personalized dashboard</p>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className="role-badge">User</span>
            </div>
          </div>
          
          <nav className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine /> Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              <FaShoppingCart /> Cart
            </button>
            <button 
              className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FaFileAlt /> Documents
            </button>
            <button 
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FaHistory /> Activity
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <>
              <div className="stats-grid">
                {userStats.map((stat, index) => (
                  <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                    <div className="stat-icon" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <h3>{stat.title}</h3>
                      <p>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="content-sections">
                <div className="content-section">
                  <h2>Recent Activity</h2>
                  <div className="activity-list">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          <div className={`status-indicator ${activity.status}`}></div>
                        </div>
                        <div className="activity-details">
                          <div className="activity-main">
                            <h4>{activity.action}</h4>
                            <span className={`activity-status ${activity.status}`}>
                              {activity.status}
                            </span>
                          </div>
                          <p className="activity-time">{activity.time}</p>
                          <p className="activity-description">{activity.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-section">
                  <h2>Quick Links</h2>
                  <div className="quick-links-grid">
                    {quickLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href={link.link} 
                        className="quick-link-card"
                        style={{ borderColor: link.color }}
                      >
                        <div className="link-icon" style={{ color: link.color }}>
                          {link.icon}
                        </div>
                        <div className="link-content">
                          <h3>{link.title}</h3>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'cart' && (
            <div className="cart-section">
              <h2>Shopping Cart</h2>
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <button 
                    className="primary-btn"
                    onClick={() => navigate('/products')}
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <p className="item-price">${item.price.toFixed(2)}</p>
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
                          ${(item.price * item.quantity).toFixed(2)}
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
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <button className="checkout-btn">
                      Proceed to Checkout
                    </button>
                    
                    <button 
                      onClick={() => navigate('/products')}
                      className="continue-shopping-btn"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 