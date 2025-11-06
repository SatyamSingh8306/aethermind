import { useState, useEffect } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    isSubmitted: false,
  });

  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state
    setFormStatus({
      message: 'Sending your message...',
      isError: false,
      isSubmitted: false
    });

    try {
      // Google Forms URL for POST request
      const googleFormsUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScNh0KhccfIFgu3AyqaiAPzTDSYZ1k1ps9POOcb1rhwXkaNcw/formResponse';

      // Construct the form data for Google Forms
      const formBody = new URLSearchParams();
      formBody.append('entry.2005620554', formData.name);
      formBody.append('entry.1045781291', formData.email);
      formBody.append('entry.1065046570', formData.company);
      formBody.append('entry.1166974658', formData.phone);
      formBody.append('entry.839337160', formData.message);

      // Send POST request to Google Forms
      await fetch(googleFormsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // Show success with enhanced animation
      setShowConfetti(true);
      setFormStatus({
        message: 'Thank you! Your message has been sent successfully.',
        isError: false,
        isSubmitted: true
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        message: 'Sorry, there was an error sending your message. Please try again.',
        isError: true,
        isSubmitted: false
      });
    }
  };

  // Confetti Animation Component
  const ConfettiEffect = () => {
    if (!showConfetti) return null;

    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Confetti particles */}
        {[...Array(150)].map((_, i) => {
          const delay = Math.random() * 2;
          const duration = 2 + Math.random() * 2;
          const left = Math.random() * 100;
          const size = 8 + Math.random() * 12;
          const color = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 6)];

          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${left}%`,
                top: '-20px',
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      <ConfettiEffect />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Have questions or ready to start your AI journey? Reach out to our team and
            let's discuss how AetherMind can transform your business.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Get in Touch</h2>
                <p className="text-lg text-gray-200 leading-relaxed opacity-90">
                  We'd love to hear from you. Whether you have a question about our services,
                  pricing, or just want to learn more about how AI can benefit your business,
                  our team is here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start p-4 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 mr-4 border border-blue-500/30 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a
                      href="mailto:aicinema69@gmail.com"
                      className="text-blue-300 hover:text-blue-100 transition-colors duration-200 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      aicinema69@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start p-4 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 mr-4 border border-green-500/30 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <a
                      href="tel:+919918437706"
                      className="text-green-300 hover:text-green-100 transition-colors duration-200 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 9918437706
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start p-4 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-300 mr-4 border border-red-500/30 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Headquarters</h3>
                    <a
                      href="https://www.google.com/maps/place/National+Institute+of+Technology+Nagaland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-300 hover:text-red-100 transition-colors duration-200 block group"
                    >
                      <span className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        National Institute of Technology Nagaland
                      </span>
                      <span className="ml-6 text-sm text-gray-300">Dimapur, Nagaland 797103, India</span>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start p-4 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-300 mr-4 border border-indigo-500/30 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                    <div className="text-gray-300 space-y-1">
                      <p className="flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                      <p className="flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700/30 shadow-xl relative overflow-hidden">
              <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Send Us a Message</h2>

              {formStatus.message && (
                <div className={`mb-6 p-4 rounded-lg border transform transition-all duration-500 ${formStatus.isError
                  ? 'bg-red-900/30 border-red-700/50 text-red-200 animate-pulse'
                  : 'bg-green-900/30 border-green-700/50 text-green-200 animate-bounce'
                  }`}>
                  <div className="flex items-center">
                    {!formStatus.isError && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {formStatus.isError && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name (optional)"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (optional)"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 relative overflow-hidden transform hover:scale-105 active:scale-95 ${formStatus.isSubmitted
                      ? 'bg-green-600/60 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25'
                    }`}
                  disabled={formStatus.isSubmitted}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {formStatus.isSubmitted ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                  {!formStatus.isSubmitted && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-shimmer"></span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Our Location</h2>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/30 bg-gray-900/40 backdrop-blur-sm">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="AetherMind Headquarters"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8999999999996!2d93.7222!3d25.8999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4a3c3c3c3c3c%3A0x3c3c3c3c3c3c3c3c!2sNational%20Institute%20of%20Technology%20Nagaland!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
