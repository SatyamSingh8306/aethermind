import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'Medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { hero } = pagesData.support;

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
    setSubmitStatus(null);

    try {
      const formBody = new URLSearchParams({
        'entry.2005620554': formData.name,
        'entry.1045781291': formData.email,
        'entry.1065046570': formData.subject,
        'entry.1166974658': formData.priority,
        'entry.839337160': formData.message
      });

      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdyu6k_HoSKp0ohamz-P0ZOcIdEeVN_QjqsWB0sIrGYhNUopw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        priority: 'Medium',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {hero.title}
          </span>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up">
          {hero.subtitle}
        </p>
      </div>

      {/* Form Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl animate-fade-in-up relative overflow-hidden group">

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Decorative Corner Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl"></div>

          <div className="relative">
            {/* Form Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="flex items-center gap-1 text-sm font-semibold text-gray-200 mb-2">
                    <span>Name</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 
                             focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/20
                             transition-all duration-300 hover:border-white/20"
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className="flex items-center gap-1 text-sm font-semibold text-gray-200 mb-2">
                    <span>Email</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 
                             focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/20
                             transition-all duration-300 hover:border-white/20"
                  />
                </div>
              </div>

              {/* Subject and Priority Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="subject" className="flex items-center gap-1 text-sm font-semibold text-gray-200 mb-2">
                    <span>Subject</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 
                             focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/20
                             transition-all duration-300 hover:border-white/20"
                  />
                </div>

                <div className="group">
                  <label htmlFor="priority" className="flex items-center gap-1 text-sm font-semibold text-gray-200 mb-2">
                    <span>Priority</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white 
                               focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/20
                               transition-all duration-300 hover:border-white/20 appearance-none cursor-pointer"
                    >
                      <option value="Low" className="bg-gray-900 text-white">Low</option>
                      <option value="Medium" className="bg-gray-900 text-white">Medium</option>
                      <option value="High" className="bg-gray-900 text-white">High</option>
                      <option value="Urgent" className="bg-gray-900 text-white">Urgent</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label htmlFor="message" className="flex items-center gap-1 text-sm font-semibold text-gray-200 mb-2">
                  <span>Message</span>
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about your inquiry..."
                  required
                  rows="6"
                  className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/20
                           transition-all duration-300 hover:border-white/20 resize-none"
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`flex items-center gap-3 p-4 rounded-xl animate-slide-in ${submitStatus === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                  <span className="text-xl font-bold">
                    {submitStatus === 'success' ? '✓' : '✕'}
                  </span>
                  <span className="font-medium">
                    {submitStatus === 'success'
                      ? 'Thank you! Your message has been sent successfully.'
                      : 'Something went wrong. Please try again.'}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl
                         text-white font-bold text-lg overflow-hidden
                         hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1
                         active:translate-y-0
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default SupportPage;