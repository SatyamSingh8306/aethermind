import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CtaSection = () => {
    return (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-xl rounded-2xl p-10 border border-white/30 shadow-xl"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                        Ready to Transform Your Business with AI?
                    </h2>
                    <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Schedule a free consultation with our experts to discover how AetherMind
                        can elevate your business and join 500+ companies already using our solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to="/demo"
                                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg text-sm"
                            >
                                🚀 Get Started Now
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to="/contact"
                                className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-6 rounded-xl border border-white/30 transition-all duration-300 backdrop-blur-sm text-sm"
                            >
                                💬 Contact Sales
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;