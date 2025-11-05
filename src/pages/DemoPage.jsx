import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaUserTie, FaChartLine, FaShieldAlt, FaHeadset, FaStar, FaRocket, FaLightbulb } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    comments: '',
    heardAbout: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const benefits = [
    {
      icon: <FaUserTie className="text-blue-400 text-xl" />,
      title: "Personalized Demo",
      description: "Custom walkthrough of our solutions for your business needs"
    },
    {
      icon: <FaChartLine className="text-green-400 text-xl" />,
      title: "ROI Analysis",
      description: "Understand AI's impact on your bottom line"
    },
    {
      icon: <FaShieldAlt className="text-purple-400 text-xl" />,
      title: "Security Overview",
      description: "Enterprise-grade security and compliance"
    },
    {
      icon: <FaHeadset className="text-orange-400 text-xl" />,
      title: "Expert Support",
      description: "Access to AI specialists throughout your journey"
    }
  ];

  const testimonials = [
    {
      quote: "AetherMind's AI solutions transformed our business operations. The demo was incredibly insightful.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp",
      company: "TechCorp",
      avatar: "https://placehold.co/40x40/4F46E5/FFFFFF?text=SJ"
    },
    {
      quote: "The personalized demo helped us understand exactly how we could leverage AI in our workflow.",
      author: "Michael Chen",
      position: "Operations Director",
      company: "Global Solutions Inc.",
      avatar: "https://placehold.co/40x40/10B981/FFFFFF?text=MC"
    }
  ];

  const heardAboutOptions = [
    'LinkedIn',
    'Reddit',
    'Twitter/X',
    'Facebook',
    'Instagram',
    'YouTube',
    'Google Search',
    'Referral',
    'Conference/Event',
    'Email Newsletter',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const googleFormData = new FormData();
      googleFormData.append('entry.2005620554', formData.name);
      googleFormData.append('entry.1045781291', formData.email);
      googleFormData.append('entry.1166974658', formData.phoneNumber);
      googleFormData.append('entry.839337160', formData.comments);
      googleFormData.append('entry.1589898496', formData.heardAbout);

      const response = await fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLScndJoPg5VlVkjyr4VTcIf_KF79S8YhqxM7eNQF1Mndlf1LIQ/formResponse',
        {
          method: 'POST',
          body: googleFormData,
          mode: 'no-cors'
        }
      );

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        comments: '',
        heardAbout: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <BackgroundAnimation />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transform Your Business
              </span>
              <br />
              <span className="text-white text-2xl md:text-4xl">with AI Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience a personalized demonstration of how AetherMind's cutting-edge AI solutions
              can revolutionize your operations and drive unprecedented growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: "500+", label: "Businesses Transformed", color: "from-blue-500 to-cyan-500" },
              { number: "98%", label: "Client Satisfaction", color: "from-green-500 to-emerald-500" },
              { number: "24/7", label: "Expert Support", color: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl"
              >
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.number}
                </div>
                <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-1 mb-12 justify-center">
            {['form', 'info'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'form' ? '🚀 Schedule Demo' : '🔍 What to Expect'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                  <AnimatePresence>
                    {submitSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                        >
                          <FaCheckCircle className="text-white text-4xl" />
                        </motion.div>

                        <motion.h3
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                        >
                          Thank You!
                        </motion.h3>

                        <motion.p
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-lg text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed"
                        >
                          Your demo request has been successfully submitted! 🎉
                        </motion.p>

                        <motion.div
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 backdrop-blur-sm border border-white/10"
                        >
                          <p className="text-base text-gray-200 mb-3">
                            <FaRocket className="inline mr-2 text-blue-400 text-sm" />
                            <strong>Our team is preparing your personalized demo.</strong>
                          </p>
                          <p className="text-base text-gray-300">
                            <FaLightbulb className="inline mr-2 text-yellow-400 text-sm" />
                            We'll contact you within 24 hours to schedule your session!
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.0 }}
                          className="mt-6 flex justify-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-3 border-blue-400/30 border-t-blue-400 rounded-full"
                          />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-200">
                              Full Name *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                              Email Address *
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm"
                                placeholder="Enter your email address"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-200">
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="heardAbout" className="block text-sm font-semibold text-gray-200">
                              Where did you hear about us? *
                            </label>
                            <div className="relative">
                              <select
                                id="heardAbout"
                                name="heardAbout"
                                value={formData.heardAbout}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 appearance-none text-sm"
                              >
                                <option value="" className="text-gray-600">Select an option</option>
                                {heardAboutOptions.map((option, index) => (
                                  <option key={index} value={option} className="text-gray-900">
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label htmlFor="comments" className="block text-sm font-semibold text-gray-200">
                            Tell us about your vision:
                            <span className="text-blue-400 ml-1 text-xs font-normal">
                              (Your idea, challenges, and goals)
                            </span>
                          </label>
                          <div className="relative">
                            <textarea
                              id="comments"
                              name="comments"
                              value={formData.comments}
                              onChange={handleInputChange}
                              placeholder="• What challenges are you currently facing that you want to automate?
• Your idea, vision, and aim
• Your current plan and business goals"
                              rows="5"
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none text-sm"
                            />
                          </div>
                        </div>

                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-200 text-sm"
                          >
                            {submitError}
                          </motion.div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              <span className="text-sm">Processing...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <FaRocket className="text-sm" />
                              <span className="text-sm">Schedule Your AI Demo</span>
                            </div>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-12">
                  {/* Benefits Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
                      >
                        <div className="mb-3 flex justify-center">{benefit.icon}</div>
                        <h3 className="text-base font-bold mb-2 text-white text-center">{benefit.title}</h3>
                        <p className="text-gray-300 text-xs text-center leading-relaxed">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Demo Process */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Your Demo Journey
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        { number: "1", title: "Schedule", desc: "Choose time", icon: "📅" },
                        { number: "2", title: "Consult", desc: "Discuss needs", icon: "💬" },
                        { number: "3", title: "Demonstrate", desc: "See it live", icon: "✨" },
                        { number: "4", title: "Implement", desc: "Get plan", icon: "🚀" }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          className="text-center"
                        >
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-md">
                            {step.icon}
                          </div>
                          <div className="text-xl font-bold text-blue-400 mb-2">{step.number}</div>
                          <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
                          <p className="text-gray-300 text-xs">{step.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Testimonials */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      Success Stories
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white/5 rounded-xl p-6 border border-white/10"
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.author}
                              className="w-10 h-10 rounded-full border border-white/30"
                            />
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className="text-yellow-400 text-xs" />
                                ))}
                              </div>
                              <p className="text-gray-300 mb-3 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                              <div>
                                <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                                <p className="text-gray-400 text-xs">{testimonial.position}</p>
                                <p className="text-blue-400 font-medium text-xs">{testimonial.company}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-xl rounded-2xl p-10 border border-white/30 shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 500+ businesses that have revolutionized their operations with AetherMind's AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg text-sm"
                onClick={() => setActiveTab('form')}
              >
                🚀 Schedule Demo Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                as={Link}
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-6 rounded-xl border border-white/30 transition-all duration-300 backdrop-blur-sm text-sm"
              >
                💬 Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
