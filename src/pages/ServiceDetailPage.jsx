// src/pages/ServiceDetailPage.jsx
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { servicesData } from '../data/servicesData';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const service = useMemo(() => {
    return servicesData.find((entry) => entry.id === serviceId);
  }, [serviceId]);

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

    // Google Form submission URL
    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScHxIa5lozz6AJwp-sFHGWJKCEmPUmwgWX3VR7AMQ52eVg7Ww/formResponse';

    // Map form data to Google Form entry IDs
    const formDataEncoded = new URLSearchParams({
      'entry.2005620554': formData.name,
      'entry.1045781291': formData.email,
      'entry.1065046570': formData.company,
      'entry.839337160': formData.message || `Interested in: ${service?.title || 'Service inquiry'}`
    });

    try {
      // Note: Google Forms doesn't support CORS, so we'll use a proxy or handle it differently
      // Option 1: Use fetch with no-cors mode (won't get response but form will submit)
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataEncoded.toString()
      });

      // Since we can't get response with no-cors, assume success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });

      // Alternative Option 2: Use a proxy server (uncomment if you have a proxy setup)
      // const response = await fetch('/api/submit-form', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     formUrl: FORM_URL,
      //     formData: formDataEncoded.toString()
      //   })
      // });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  if (!service) {
    return (
      <div className="relative min-h-screen text-white">
        <BackgroundAnimation />
        <section className="relative z-10 py-20 px-4 flex items-center justify-center">
          <div className="rounded-lg p-8 max-w-md w-full text-center border border-gray-700">
            <h1 className="text-2xl font-bold mb-2">Service not found</h1>
            <p className="text-gray-300 mb-6">
              The service you are looking for is unavailable or has been moved.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
            >
              <FaArrowLeft className="text-sm" /> Back to Services
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundAnimation />

      {/* Hero */}
      <section
        className="relative z-10 py-16 px-4 text-white"
        style={
          service.heroImage
            ? {
              backgroundImage: `linear-gradient(135deg, rgba(10, 12, 29, 0.85), rgba(19, 21, 45, 0.75)), url(${service.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
            : {}
        }
      >
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 mb-6"
          >
            <FaArrowLeft className="text-sm" /> Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{service.title}</h1>
          <p className="text-lg text-gray-200 mb-6">{service.tagline}</p>

          {service.metrics && (
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {service.metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-gray-300 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="relative z-10 px-4 py-12 max-w-4xl mx-auto">
        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why this service</h2>
          <p className="text-gray-300 mb-4">{service.description}</p>
          <div className="space-y-2">
            {service.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-gray-300">
                <FaCheckCircle className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Capabilities & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Key Capabilities</h3>
            <ul className="space-y-2">
              {service.modules.map((module, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <FaCheckCircle className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Implementation Benefits</h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <FaCheckCircle className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked</h3>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <details key={idx} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <summary className="cursor-pointer list-none font-medium flex justify-between items-center">
                  {faq.question}
                  <span className="text-indigo-400">▼</span>
                </summary>
                <p className="mt-2 text-gray-300 pl-1">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Request a Consultation</h3>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  How can we help? (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                  placeholder={`I'm interested in ${service.title}...`}
                ></textarea>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-900 border border-green-700 rounded text-green-300">
                  Thank you! Your request has been submitted successfully. We'll be in touch soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-red-900 border border-red-700 rounded text-red-300">
                  There was an error submitting your request. Please try again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 font-medium rounded transition-colors ${isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                  } text-white`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to explore {service.title}?</h3>
          <p className="text-gray-300 mb-4">
            Schedule a strategy session with our consultants to tailor this service to your roadmap.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium"
          >
            Talk to our team <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;