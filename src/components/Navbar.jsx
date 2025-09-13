import { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import {
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSearch,
} from 'react-icons/fa';

/* ---------------- CUSTOM HOOKS ---------------- */

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

const useKeyboardNavigation = (isOpen, onClose) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
};

/* ---------------- REUSABLE SUBCOMPONENTS ---------------- */

const CartIcon = ({ totalItems }) => (
  <Link
    to="/cart"
    className="relative flex items-center justify-center w-10 h-10 rounded-full 
               bg-white/5 text-slate-200 hover:text-cyan-400 
               hover:bg-white/10 transition-all duration-300
               hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
    aria-label={`Shopping cart with ${totalItems} items`}
  >
    <FaShoppingCart className="w-5 h-5" aria-hidden="true" />
    {totalItems > 0 && (
      <span
        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 
                   text-white text-xs font-bold min-w-5 h-5 
                   rounded-full flex items-center justify-center shadow-lg
                   ring-2 ring-slate-900 animate-bounce"
        aria-label={`${totalItems} items in cart`}
      >
        {totalItems > 99 ? '99+' : totalItems}
      </span>
    )}
  </Link>
);

const UserAvatar = ({ user, size = 'sm' }) => {
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                     flex items-center justify-center text-white font-medium shadow-md
                     ring-2 ring-white/20`}>
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          className="w-full h-full object-cover rounded-full"
          loading="lazy"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  );
};

const SearchBar = ({ isVisible, onToggle }) => (
  <div className={`relative transition-all duration-300 ${isVisible ? 'w-64' : 'w-0'} overflow-hidden`}>
    <input
      type="search"
      placeholder="Search products..."
      className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-full
                 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 
                 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
      aria-label="Search products"
    />
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
      aria-hidden="true" />
  </div>
);

const NotificationBell = ({ count = 0 }) => (
  <button
    className="relative flex items-center justify-center w-10 h-10 rounded-full 
               bg-white/5 text-slate-200 hover:text-cyan-400 
               hover:bg-white/10 transition-all duration-300 hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
    aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ''}`}
  >
    <FaBell className="w-5 h-5" aria-hidden="true" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                       min-w-4 h-4 rounded-full flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    )}
  </button>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
               bg-white/5 text-slate-200 hover:text-cyan-400 hover:bg-white/10
               transition-all duration-300 focus:outline-none focus:ring-2 
               focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    {isOpen ? (
      <FaTimes className="w-5 h-5" aria-hidden="true" />
    ) : (
      <FaBars className="w-5 h-5" aria-hidden="true" />
    )}
  </button>
);

/* ---------------- MAIN NAVBAR ---------------- */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();

  // Refs for click outside detection
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = useMemo(
    () => [
      { path: '/', label: 'Home', description: 'Go to homepage' },
      { path: '/products', label: 'Products', description: 'Browse our products' },
      { path: '/services', label: 'Services', description: 'View our services' },
      { path: '/about', label: 'About', description: 'Learn about us' },
      { path: '/contact', label: 'Contact', description: 'Get in touch' },
    ],
    []
  );

  // Enhanced scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchVisible(false);
  }, [location.pathname]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Custom hooks for better UX
  useClickOutside(userMenuRef, () => setUserMenuOpen(false));
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));
  useKeyboardNavigation(mobileMenuOpen, () => setMobileMenuOpen(false));
  useKeyboardNavigation(userMenuOpen, () => setUserMenuOpen(false));

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout]);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled
      ? 'bg-slate-900/80 shadow-xl shadow-black/25 py-2 backdrop-blur-xl'
      : 'bg-slate-900/70 py-4 backdrop-blur-lg'
    }`;

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className={navbarClass} role="navigation" aria-label="Main navigation">
        <div className="navbar-container flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">

          {/* Left Section: Company Logo (as requested) */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 
                         focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
            >
              <Logo size="medium" />
            </Link>
          </div>

          {/* Right Section: Navigation + Actions (all on right as requested) */}
          <div className="flex items-center gap-x-2 sm:gap-x-4">

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-1" aria-label="Primary navigation">
              <ul className="flex items-center gap-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      title={item.description}
                      className={`relative py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                          ? 'text-cyan-400 bg-cyan-400/10 font-semibold shadow-lg shadow-cyan-400/20'
                          : 'text-slate-200 hover:text-cyan-400 hover:bg-white/5 hover:scale-[1.02]'
                        }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                                       w-1 h-1 bg-cyan-400 rounded-full"
                          aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Notifications (only for authenticated users) */}
            {isAuthenticated && <NotificationBell count={3} />}

            {/* Shopping Cart (only for authenticated users) */}
            {isAuthenticated && <CartIcon totalItems={totalItems} />}

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-lg 
                             hover:bg-white/10 transition-all duration-200 text-slate-200 
                             focus:outline-none focus:ring-2 focus:ring-cyan-400
                             focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <UserAvatar user={user} />
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium leading-tight">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-400 leading-tight">
                      {user?.role || 'Member'}
                    </span>
                  </div>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''
                    }`} aria-hidden="true" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/95 
                                backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 
                                overflow-hidden animate-dropdownFadeIn">
                    {/* User Info Section */}
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                                  border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} size="md" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-200 text-sm">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-400">{user?.email}</p>
                          <p className="text-xs text-cyan-400 font-medium">
                            {user?.role || 'Member'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {[
                        { path: '/dashboard', icon: FaUser, label: 'Dashboard' },
                        { path: '/profile', icon: FaUser, label: 'Profile' },
                        { path: '/orders', icon: FaShoppingCart, label: 'My Orders' },
                        { path: '/settings', icon: FaCog, label: 'Settings' },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-200 
                                   hover:bg-white/10 hover:text-cyan-400 transition-all duration-200"
                        >
                          <item.icon className="w-4 h-4" aria-hidden="true" />
                          {item.label}
                        </Link>
                      ))}
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 
                                 text-red-400 hover:bg-red-400/10 transition-all duration-200"
                      >
                        <FaSignOutAlt className="w-4 h-4" aria-hidden="true" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 rounded-full border border-cyan-400 
                           text-cyan-400 hover:bg-cyan-400/20 hover:shadow-lg 
                           hover:shadow-cyan-400/30 text-sm transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 
                           focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 
                           text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-400/40
                           hover:scale-105 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 
                           focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 w-80 h-full bg-slate-900/95 backdrop-blur-xl 
                     shadow-2xl animate-slideInRight overflow-y-auto"
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Logo size="small" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                        ? 'text-cyan-400 bg-cyan-400/10 font-semibold'
                        : 'text-slate-200 hover:text-cyan-400 hover:bg-white/5'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search - Only show if not on homepage */}
              {!isHomePage && (
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search products..."
                      className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 
                               rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none 
                               focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                       text-slate-400 w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Mobile Auth Section */}
              {!isAuthenticated && (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-3 text-center rounded-lg border 
                             border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 text-center rounded-lg 
                             bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Cart & Notifications for authenticated users */}
              {isAuthenticated && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Notifications</span>
                    <NotificationBell count={3} />
                  </div>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between w-full px-4 py-3 
                             rounded-lg bg-white/5 text-slate-200 hover:bg-cyan-400/10 
                             hover:text-cyan-400 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Shopping Cart</span>
                    {totalItems > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold 
                                     min-w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes dropdownFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-12px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }

        .animate-dropdownFadeIn {
          animation: dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }

        /* Enhanced focus styles */
        .navbar-container button:focus-visible,
        .navbar-container a:focus-visible {
          outline: 2px solid #22d3ee;
          outline-offset: 2px;
        }

        /* Smooth transitions for all interactive elements */
        .navbar-container * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        }

        /* Ensure body has proper spacing for sticky navbar */
        body {
          padding-top: 0;
        }
        
        /* If you need fixed positioning instead of sticky, add this class to your main content wrapper */
        .main-content-with-fixed-navbar {
          padding-top: 80px; /* Adjust based on your navbar height */
        }
      `}</style>
    </>
  );
};

export default Navbar;