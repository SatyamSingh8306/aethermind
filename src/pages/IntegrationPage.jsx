import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { getIntegrationScript } from '../services/api';
import { FaArrowLeft, FaCopy, FaCheck, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const IntegrationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('clientId');

  const [integrationData, setIntegrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!clientId) {
      navigate('/dashboard');
      return;
    }

    let isMounted = true;

    const fetchIntegration = async () => {
      try {
        setLoading(true);
        const data = await getIntegrationScript(clientId);
        if (isMounted) {
          setIntegrationData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load integration script');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIntegration();

    return () => {
      isMounted = false;
    };
  }, [clientId, navigate]);

  const handleCopy = () => {
    if (integrationData?.scriptTag) {
      navigator.clipboard.writeText(integrationData.scriptTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!clientId) {
    return null;
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <BackgroundAnimation />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="loader mx-auto mb-4"></div>
              <p className="text-gray-400">Loading integration script...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <FaExclamationCircle className="text-red-400 text-xl" />
                <h3 className="text-lg font-semibold text-red-400">Error</h3>
              </div>
              <p className="text-gray-300">{error}</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          ) : integrationData ? (
            <div className="space-y-6">
              {/* Script Tag */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium">
                    Script Tag
                  </label>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <FaCheck /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Script
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{integrationData.scriptTag}</code>
                  </pre>
                </div>
              </div>

              {/* Instructions */}
              {integrationData.instructions && (
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-400 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-400 mb-2">Usage Instructions</h3>
                      <p className="text-sm text-gray-300 mb-2">{integrationData.instructions.usage}</p>
                      {integrationData.instructions.note && (
                        <p className="text-sm text-gray-400 mb-2">
                          <strong>Note:</strong> {integrationData.instructions.note}
                        </p>
                      )}
                      {integrationData.instructions.example && (
                        <p className="text-sm text-gray-400">
                          <strong>Example:</strong> {integrationData.instructions.example}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Widget URL</h4>
                  <p className="text-sm text-gray-300 break-all">{integrationData.widgetUrl}</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">API Base</h4>
                  <p className="text-sm text-gray-300 break-all">{integrationData.apiBase}</p>
                </div>
              </div>

              {/* Client ID Info */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Client ID</h4>
                <p className="text-sm text-gray-300 font-mono">{integrationData.clientId}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={handleCopy}
                  className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Script Again'}
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default IntegrationPage;