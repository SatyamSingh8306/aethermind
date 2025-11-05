import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaTimes,
  FaStar,
  FaMinus,
  FaPlus,
  FaRocket,
  FaLock,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaUndo
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { formatInr } from '../utils/currency';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartEffect, setShowAddToCartEffect] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      setShowAddToCartEffect(true);
      setTimeout(() => setShowAddToCartEffect(false), 2000);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <BackgroundAnimation />

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => navigate('/products')}
      />

      {/* Modal Content - Optimized for no scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-6xl w-full h-[90vh] max-h-[600px] grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-gray-700 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/products')}
          className="absolute top-3 right-3 z-10 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Left: Image Section (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 flex flex-col">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center mb-4">
            <img
              src={product.image || '/images/product-placeholder.jpg'}
              alt={product.name}
              className="w-full h-full max-h-[280px] object-contain rounded-lg"
            />
          </div>

          {/* Trust Badges - Compact */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-800/50 rounded-lg p-2 text-center">
              <FaTruck className="text-green-400 mx-auto mb-1 text-sm" />
              <p className="text-xs text-gray-400">Fast Delivery</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 text-center">
              <FaShieldAlt className="text-blue-400 mx-auto mb-1 text-sm" />
              <p className="text-xs text-gray-400">Secure</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 text-center">
              <FaUndo className="text-yellow-400 mx-auto mb-1 text-sm" />
              <p className="text-xs text-gray-400">30-Day Return</p>
            </div>
          </div>
        </div>

        {/* Right: Content Section (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col">
          {/* Header Section - Compact */}
          <div className="mb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <span className="inline-block px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-medium mb-2">
                  {product.category}
                </span>
                <h1 className="text-xl font-bold text-white">{product.name}</h1>
              </div>
              {/* Rating - Moved to header */}
              <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg px-2 py-1">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-sm font-medium">4.5</span>
                <span className="text-xs text-gray-400">(124)</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Features Grid - Compact 2x3 */}
          {product.features && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 py-3 border-y border-gray-800">
              {product.features.slice(0, 6).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                  <span className="text-xs text-gray-300 line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-indigo-400">
                  {formatInr(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatInr(product.price * 1.2)}
                </span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-xs text-gray-400 mb-1 text-right">Quantity</p>
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* Specifications - Compact Inline */}
          <div className="flex gap-4 mb-4 pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Stock:</span>
              <span className="text-xs font-medium text-green-400">In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">SKU:</span>
              <span className="text-xs font-medium">#{product.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Total:</span>
              <span className="text-sm font-bold text-indigo-400">
                {formatInr(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Action Buttons - Bottom */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`py-3 ${showAddToCartEffect
                  ? 'bg-green-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                } rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors`}
            >
              {showAddToCartEffect ? (
                <>
                  <FaCheckCircle />
                  Added to Cart!
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  Add to Cart
                </>
              )}
            </motion.button>

            {product.status === 'live' && product.serviceUrl ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(product.serviceUrl, '_blank')}
                className="py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FaRocket />
                Try Live Demo
              </motion.button>
            ) : (
              <button
                disabled
                className="py-3 bg-gray-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              >
                <FaLock />
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;