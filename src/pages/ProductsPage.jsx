import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaEye,
  FaStar,
  FaTag,
  FaRocket,
  FaBolt,
  FaChartLine
} from 'react-icons/fa';
import { fetchProducts } from '../services/api';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { formatInr } from '../utils/currency';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // serve cached products instantly if available to avoid blank on back nav
        const cached = sessionStorage.getItem('products_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && mounted) {
            setProducts(parsed);
            setIsLoading(false);
          }
        }
      } catch {}
      try {
        const apiProducts = await fetchProducts();
        if (!mounted) return;
        const root = Array.isArray(apiProducts)
          ? apiProducts
          : (apiProducts?.products || apiProducts?.data || apiProducts?.items || []);
        const mapped = root.map((p, idx) => ({
          id: p.productId ?? p.id ?? p._id ?? idx,
          name: p.name ?? 'Untitled',
          description: p.description ?? '',
          price: Number(p.price ?? 0),
          image: p.image ?? '',
          category: p.category ?? 'General',
          features: Array.isArray(p.features) ? p.features : [],
          status: p.status ?? 'live',
          serviceUrl: p.serviceUrl ?? ''
        }));
        try { sessionStorage.setItem('products_cache', JSON.stringify(mapped)); } catch {}
        setProducts(mapped);
      } catch (e) {
        console.error('Failed to load products', e);
        // Keep previously shown products instead of clearing on error
      } finally {
        setIsLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
    return () => { mounted = false; };
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <BackgroundAnimation />

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-20 pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-2 mb-6"
          >
            <FaRocket className="text-indigo-400" />
            <span className="text-sm font-medium">Cutting-edge AI Solutions</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our innovative AI and data solutions designed to transform your business
          </p>
        </div>
      </motion.div>

      {/* Controls Section */}
      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 items-center">
                <FaFilter className="text-gray-400" />
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={`${product.id ?? 'p'}-${idx}`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all duration-300">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      <img
                        src={product.image || '/images/product-placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                        {product.category}
                      </span>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuickAdd(product)}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <FaShoppingCart className="text-sm" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-xs ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">(4.5)</span>
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-indigo-400">
                            {formatInr(product.price)}
                          </span>
                        </div>
                        <Link
                          to={`/products/${product.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-indigo-600/30 transition-all flex items-center gap-1"
                        >
                          <FaEye className="text-xs" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search term</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;