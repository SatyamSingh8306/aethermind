// src/components/Navbar.jsx
import { useState, useEffect, useContext, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSearch,
  FaBell,
  FaHome,
  FaBox,
  FaServicestack,
  FaInfoCircle,
  FaPhone
} from 'react-icons/fa';

// Lazy load heavy components
const UserMenu = lazy(() => import('./UserMenu'));

/* ---------------- CONSTANTS ---------------- */
const SCROLL_THRESHOLD = 20;
const MOBILE_BREAKPOINT = 768;
const ANIMATION_DURATION = 300;
const DEBOUNCE_DELAY = 100;

/* ---------------- UTILITIES ---------------- */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const sanitizeUserInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '');
};

/* ---------------- CUSTOM HOOKS ---------------- */
const useClickOutside = (ref, callback, isEnabled = true) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Use capture phase for better performance
    document.addEventListener('mousedown', handleClick, true);
    return () => document.removeEventListener('mousedown', handleClick, true);
  }, [ref, callback, isEnabled]);
};

const useKeyboardNavigation = (isOpen, onClose, additionalKeys = {}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      // Handle additional keyboard shortcuts
      Object.entries(additionalKeys).forEach(([key, handler]) => {
        if (event.key === key) {
          handler(event);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, additionalKeys]);
};

const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch();
    media.addEventListener('change', updateMatch);
    return () => media.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
};

/* ---------------- SUBCOMPONENTS ---------------- */
const NotificationBadge = ({ count }) => {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 
                     bg-red-500 text-white text-[10px] font-bold 
                     rounded-full flex items-center justify-center
                     animate-pulse ring-2 ring-slate-900">
      {count > 9 ? '9+' : count}
    </span>
  );
};

// const SearchBar = ({ isScrolled }) => {
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useClickOutside(searchRef, () => setSearchOpen(false), searchOpen);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//     }
//   };

//   return (
//     <div className="hidden md:block relative" ref={searchRef}>
//       {!searchOpen ? (
//         <button
//           onClick={() => setSearchOpen(true)}
//           className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-cyan-400
//                      transition-all duration-200 focus:outline-none focus:ring-2 
//                      focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
//           aria-label="Open search"
//         >
//           <FaSearch className="w-4 h-4" />
//         </button>
//       ) : (
//         <form onSubmit={handleSearch} className="absolute right-0 top-0">
//           <input
//             ref={(input) => input?.focus()}
//             type="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search..."
//             className="w-64 px-4 py-2 bg-slate-800/90 backdrop-blur-xl border border-white/10
//                        rounded-lg text-white placeholder-slate-400 
//                        focus:outline-none focus:ring-2 focus:ring-cyan-400 
//                        focus:border-transparent animate-slideInLeft"
//             aria-label="Search input"
//           />
//         </form>
//       )}
//     </div>
//   );
// };

const CartIcon = ({ totalItems, onClick }) => (
  <Link
    to="/cart"
    onClick={onClick}
    className="relative p-2 rounded-lg hover:bg-white/10 text-slate-400 
               hover:text-cyan-400 transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-cyan-400 
               focus:ring-offset-2 focus:ring-offset-slate-900"
    aria-label={`Shopping cart with ${totalItems} items`}
  >
    <FaShoppingCart className="w-5 h-5" />
    <NotificationBadge count={totalItems} />
  </Link>
);

const NavLink = ({ item, isActive, onClick }) => {
  const icons = {
    '/': FaHome,
    '/products': FaBox,
    '/services': FaServicestack,
    '/about': FaInfoCircle,
    '/contact': FaPhone
  };

  const Icon = icons[item.path];

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative group py-2.5 px-4 rounded-lg text-sm font-medium 
                 transition-all duration-200 flex items-center gap-2
                 ${isActive
          ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
          : 'text-slate-200 hover:text-cyan-400 hover:bg-white/5'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon className="w-4 h-4 hidden lg:inline" />}
      {item.label}
      {isActive && (
        <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r 
                        from-transparent via-cyan-400 to-transparent" />
      )}
    </Link>
  );
};

const UserAvatar = ({ user, size = 'sm', onClick }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
  };

  const displayName = sanitizeUserInput(user?.name || 'User');
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                 flex items-center justify-center text-white font-medium shadow-md
                 ring-2 ring-white/20 hover:ring-cyan-400/50 transition-all duration-200
                 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
      aria-label={`User menu for ${displayName}`}
    >
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt=""
          className="w-full h-full object-cover rounded-full"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{initial}</span>
      )}
    </button>
  );
};

/* ---------------- MAIN NAVBAR ---------------- */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const navItems = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ], []);

  // Optimized scroll handler with debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, DEBOUNCE_DELAY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Hooks
  useScrollLock(mobileMenuOpen && isMobile);
  useClickOutside(userMenuRef, () => setUserMenuOpen(false), userMenuOpen);
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false), mobileMenuOpen);
  useKeyboardNavigation(mobileMenuOpen, () => setMobileMenuOpen(false));
  useKeyboardNavigation(userMenuOpen, () => setUserMenuOpen(false));

  // Handlers
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Show error notification
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, navigate, isLoggingOut]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    setUserMenuOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setUserMenuOpen(prev => !prev);
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
                   ${isScrolled
            ? 'bg-slate-900/95 shadow-2xl py-2 backdrop-blur-xl'
            : 'bg-slate-900/80 py-4 backdrop-blur-lg'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 
                        focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
              aria-label="Home"
            >
              <Logo size={isScrolled ? "small" : "medium"} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-1" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-x-3">

              {isAuthenticated && (
                <>
                  <button
                    className="relative p-2 rounded-lg hover:bg-white/10 text-slate-400 
                             hover:text-cyan-400 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-label="Notifications"
                  >
                    <FaBell className="w-5 h-5" />
                    <NotificationBadge count={notifications} />
                  </button>

                  <CartIcon totalItems={totalItems} />

                  <div className="relative" ref={userMenuRef}>
                    <UserAvatar
                      user={user}
                      onClick={toggleUserMenu}
                    />

                    {userMenuOpen && (
                      <Suspense fallback={<div className="absolute top-full right-0 mt-2 w-64 h-32 bg-slate-900/95 rounded-xl animate-pulse" />}>
                        <UserMenu
                          user={user}
                          onLogout={handleLogout}
                          onClose={() => setUserMenuOpen(false)}
                          isLoggingOut={isLoggingOut}
                        />
                      </Suspense>
                    )}
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex px-4 py-2 rounded-full border border-cyan-400 
                             text-cyan-400 hover:bg-cyan-400/20 text-sm transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 
                             text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-slate-400 
                         hover:text-cyan-400 transition-all duration-200"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 w-80 max-w-full h-full bg-slate-900/95 
                     backdrop-blur-xl shadow-2xl border-l border-white/10 
                     animate-slideInRight overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Mobile menu content */}
            <div className="p-6">
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

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    item={item}
                    isActive={location.pathname === item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </nav>

              {/* Mobile auth section */}
              {!isAuthenticated && (
                <div className="mt-8 space-y-3">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;