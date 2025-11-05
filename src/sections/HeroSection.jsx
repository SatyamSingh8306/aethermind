// HeroSection.jsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Rocket } from 'lucide-react';

const HeroSection = memo(() => {
  return (
    <section
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section with AI innovation introduction"
    >
      {/* Optional: Add a subtle background gradient or image here if needed */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-black"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-medium border border-cyan-500/30">
              <Zap className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              AI-Powered Innovation
            </div>

            <motion.h1
              className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Intelligent AI
              </span>
              <br />
              <span className="text-white">Solutions for</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next-Gen Business
              </span>
            </motion.h1>

            <motion.p
              className="hero-subtitle text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            >
              AetherMind delivers cutting-edge AI automation, intelligent analytics, and autonomous agents that{' '}
              <span className="text-cyan-400 font-semibold">transform your business processes</span> into competitive advantages.
            </motion.p>

            <motion.div
              className="hero-cta-group flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            >
              <Link
                to="/services"
                className="primary-btn group relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                aria-label="Explore our AI services"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Rocket className="inline-block ml-1.5 w-3 h-3 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
              </Link>

              <Link
                to="/demo"
                className="secondary-btn px-6 py-3 border border-cyan-400 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm"
                aria-label="Schedule a product demo"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </section>
  );
});

export default HeroSection;