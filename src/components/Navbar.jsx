import { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import "../styles/Navbar.css"
import { FaUser, FaBell, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      if (isScrolled) setIsScrolled(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menus when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle body class for preventing scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Nav items array for easy updates
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" aria-label="Go to homepage">
              <Logo size="medium" />
            </Link>
          </div>

          {/* Mobile Actions Group */}
          <div className="mobile-actions">
            <div className="action-group">
              <Link to="/cart" className="icon-btn cart-btn-mobile" aria-label="Shopping Cart">
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            </div>
            
            <button 
              className="menu-icon" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>

          {/* Main Navigation */}
          <div className={`nav-wrapper ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-menu" role="menu">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path} role="none">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Area */}
            <div className="nav-actions">
              <div className="action-buttons">
                <Link to="/cart" className="icon-btn cart-btn-desktop" aria-label="Shopping Cart">
                  <FaShoppingCart />
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Link>
              </div>
              
              {isAuthenticated ? (
                <div className="user-menu-container">
                  <button 
                    className="user-info" 
                    onClick={toggleUserMenu}
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    <span className="user-avatar" aria-hidden="true">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="" className="avatar-image" />
                      ) : (
                        user?.name?.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span className="user-name">{user?.name}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="user-dropdown" role="menu">
                      <div className="dropdown-header">
                        <span className="greeting">Hi, {user?.name?.split(' ')[0]}</span>
                        <span className="user-email">{user?.email}</span>
                      </div>
                      
                      <Link to="/dashboard" className="dropdown-item" role="menuitem">
                        <FaUser /> Dashboard
                      </Link>
                      <Link to="/profile" className="dropdown-item" role="menuitem">
                        <FaUser /> Profile
                      </Link>
                      <Link to="/notifications" className="dropdown-item" role="menuitem">
                        <FaBell /> Notifications
                        {user?.unreadNotifications > 0 && (
                          <span className="notification-badge">{user.unreadNotifications}</span>
                        )}
                      </Link>
                      <Link to="/settings" className="dropdown-item" role="menuitem">
                        <FaCog /> Settings
                      </Link>
                      <div className="dropdown-divider" role="separator"></div>
                      <button 
                        onClick={handleLogout} 
                        className="dropdown-item logout"
                        role="menuitem"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="login-btn">Login</Link>
                  <Link to="/register" className="register-btn">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      <div 
        className={`overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;