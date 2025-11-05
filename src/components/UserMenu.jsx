// src/components/UserMenu.jsx
import { Link } from 'react-router-dom';
import {
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaShoppingBag,
    FaTachometerAlt,
    FaHeart
} from 'react-icons/fa';

const UserMenu = ({ user, onLogout, onClose, isLoggingOut }) => {
    const menuItems = [
        { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/profile', icon: FaUser, label: 'Profile' },
        { path: '/orders', icon: FaShoppingBag, label: 'My Orders' },
        { path: '/wishlist', icon: FaHeart, label: 'Wishlist' },
        { path: '/settings', icon: FaCog, label: 'Settings' },
    ];

    return (
        <div className="absolute top-full right-0 mt-2 w-72 bg-slate-900/95 
                    backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 
                    overflow-hidden animate-dropdownFadeIn">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                    border-b border-white/10">
                <p className="font-semibold text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400">
                        {user?.role || 'Member'}
                    </span>
                    <span className="text-xs text-slate-400">
                        Member since {new Date(user?.createdAt || Date.now()).getFullYear()}
                    </span>
                </div>
            </div>

            <div className="py-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-200 
                     hover:bg-white/10 hover:text-cyan-400 transition-all duration-200"
                        onClick={onClose}
                    >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </Link>
                ))}

                <hr className="my-2 border-white/10" />

                <button
                    onClick={onLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 
                   hover:bg-red-400/10 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
            </div>
        </div>
    );
};

export default UserMenu;