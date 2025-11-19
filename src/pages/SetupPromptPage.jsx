import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { setupSystemPrompt } from '../services/api';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const SetupPromptPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('clientId');
  
  const [systemPrompt, setSystemPrompt] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('SetupPromptPage - clientId:', clientId);
    console.log('SetupPromptPage - searchParams:', searchParams.toString());
    
    // Check if clientId exists
    if (clientId) {
      setIsLoading(false);
    } else {
      // Only redirect if we're sure there's no clientId after a brief delay
      const timer = setTimeout(() => {
        const checkClientId = searchParams.get('clientId');
        console.log('SetupPromptPage - checking clientId after delay:', checkClientId);
        if (!checkClientId) {
          console.warn('No clientId found in URL, redirecting to dashboard');
          navigate('/dashboard');
        } else {
          setIsLoading(false);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [clientId, navigate, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!systemPrompt.trim()) {
      setError('System prompt is required');
      return;
    }

    if (!clientId) {
      setError('Client ID is missing. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        system_prompt: systemPrompt.trim()
      };
      
      if (name.trim()) {
        payload.name = name.trim();
      }

      await setupSystemPrompt(clientId, payload);
      setSuccess(true);
      
      // Redirect to integration page after 1.5 seconds
      setTimeout(() => {
        navigate(`/integration?clientId=${encodeURIComponent(clientId)}`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to set system prompt. It may already be set.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <BackgroundAnimation />
        <div className="relative z-10 text-center" style={{ zIndex: 10 }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(99, 102, 241, 0.3)', 
            borderTop: '4px solid #6366F1', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#fff' }}>Loading setup page...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
        <BackgroundAnimation />
        <div className="relative z-10 text-center">
          <p className="text-red-400 mb-4">Client ID is missing from the URL.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundAnimation />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-10" style={{ position: 'relative', zIndex: 10 }}>
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 md:p-8"
        >
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Setup Your Chatbot System Prompt</h1>
            <p className="text-gray-400">
              Configure the system prompt for your AI chatbot. This defines how your chatbot will behave and respond to users.
            </p>
            <p className="text-sm text-yellow-400 mt-2">
              <FaExclamationTriangle className="inline mr-1" />
              Note: System prompt can only be set once per client ID.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 text-center"
            >
              <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-3" />
              <h2 className="text-xl font-semibold mb-2">System Prompt Set Successfully!</h2>
              <p className="text-gray-300">Redirecting to integration page...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Chatbot Name (Optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My E-commerce Bot"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If not provided, defaults to &quot;Client [first 8 characters of clientId]&quot;
                </p>
              </div>

              <div>
                <label htmlFor="systemPrompt" className="block text-sm font-medium mb-2">
                  System Prompt <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="systemPrompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a helpful customer support assistant for an e-commerce website. Always be polite and professional. Help users with their questions about products, orders, shipping, and returns."
                  rows={10}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Define the personality, role, and behavior of your chatbot. Be specific about what it should and shouldn't do.
                </p>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !systemPrompt.trim()}
                  className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                >
                  {isSubmitting ? 'Setting up...' : 'Set System Prompt'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SetupPromptPage;

