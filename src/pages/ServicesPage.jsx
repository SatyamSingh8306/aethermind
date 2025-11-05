import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaChartLine,
  FaBrain,
  FaCogs,
  FaCheck,
  FaArrowRight,
  FaRocket,
  FaAward
} from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { servicesData } from '../data/servicesData';
import CtaSection from '../sections/CtaSecion';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(servicesData);
    } else {
      setFilteredServices(
        servicesData.filter(service => service.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const getServiceIcon = (serviceId) => {
    const icons = {
      'ai-automation': <FaRobot className="text-2xl" />,
      'ai-chatbots': <FaBrain className="text-2xl" />,
      'ai-analytics': <FaChartLine className="text-2xl" />,
      'custom-ai': <FaCogs className="text-2xl" />
    };
    return icons[serviceId] || <FaRocket className="text-2xl" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <BackgroundAnimation />

      {/* Enhanced Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-2 mb-6"
            >
              <FaAward className="text-yellow-400" />
              <span className="text-sm font-medium">Award-Winning AI Solutions</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Solutions for Tomorrow's Challenges
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Harness the power of artificial intelligence to revolutionize your business.
              From automation to predictive analytics, we deliver solutions that drive real results.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Services Grid */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300">
                      {/* Service Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"
                        >
                          {getServiceIcon(service.id)}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{service.tagline}</p>
                        </div>
                      </div>

                      {/* Service Description */}
                      <p className="text-gray-300 mb-6 line-clamp-3">
                        {service.description || service.tagline}
                      </p>

                      {/* Key Benefits */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-indigo-400 mb-3">
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {service.benefits.slice(0, 3).map((benefit, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                              className="flex items-start gap-2 text-gray-300 text-sm"
                            >
                              <FaCheck className="text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing Indicator (if available) */}
                      {service.pricing && (
                        <div className="mb-6 p-3 bg-gray-900/50 rounded-lg">
                          <span className="text-xs text-gray-400">Starting from</span>
                          <div className="text-xl font-bold text-indigo-400">
                            {service.pricing}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <Link
                          to={`/services/${service.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300"
                        >
                          Learn More
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mt-16"
      >
        <CtaSection />
      </motion.div>
    </div>
  );
};

export default ServicesPage;