import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart,
  FaCog,
  FaCopy,
  FaCheck,
  FaRobot,
  FaCode,
  FaInfoCircle,
  FaSignOutAlt,
  FaSave,
  FaExclamationTriangle
} from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/Dashboard.css';
import {
  fetchMyPurchases,
  getIntegrationScript,
  setupSystemPrompt
} from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Data States
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [integrationScripts, setIntegrationScripts] = useState({});

  // UI States
  const [copiedMap, setCopiedMap] = useState({});
  const [activeTab, setActiveTab] = useState('chatbot');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  // System Prompt States
  const [promptInputs, setPromptInputs] = useState({});
  const [savingPrompt, setSavingPrompt] = useState({});

  // Handle Resize for Responsive Sidebar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const u = JSON.parse(storedUser);
    setUser(u);
    if (u?.role === 'admin' || u?.role === 'superadmin') {
      navigate('/admin-dashboard');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingPurchases(true);
        const list = await fetchMyPurchases();
        const arr = Array.isArray(list) ? list : (list?.purchases || []);
        setPurchases(arr);

        const chatbotPurchases = arr.filter(p =>
          p.status === 'completed' &&
          isChatbotProduct(p)
        );

        for (const purchase of chatbotPurchases) {
          const clientId = getClientId(purchase);
          if (clientId) {
            try {
              const integration = await getIntegrationScript(clientId);
              setIntegrationScripts(prev => ({ ...prev, [purchase._id]: integration }));
            } catch (e) {
              console.log('Integration script not ready for:', clientId);
            }
          }
        }
      } catch (e) {
        console.error("Error loading purchases", e);
        setPurchases([]);
      } finally {
        setLoadingPurchases(false);
      }
    };
    if (user) load();
  }, [user]);

  const handleCopy = (key, text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedMap(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedMap(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      }, 2000);
    }
  };

  const isChatbotProduct = (purchase) => {
    return purchase.status === 'completed' &&
      (purchase.clientId ||
        purchase.purchase?.clientId ||
        purchase.productSnapshot?.productId === 101 ||
        purchase.productSnapshot?.name?.toLowerCase().includes('chat') ||
        (purchase.productSnapshot?.serviceUrl || '').toLowerCase().includes('chat'));
  };

  const getClientId = (purchase) => {
    return purchase.clientId || purchase.purchase?.clientId;
  };

  const handlePromptChange = (clientId, value) => {
    setPromptInputs(prev => ({ ...prev, [clientId]: value }));
  };

  const handleSaveSystemPrompt = async (clientId, purchaseId) => {
    const promptText = promptInputs[clientId];

    if (!promptText || promptText.trim().length < 5) {
      alert("Please enter a valid system prompt (at least 5 characters).");
      return;
    }

    setSavingPrompt(prev => ({ ...prev, [clientId]: true }));

    try {
      await setupSystemPrompt(clientId, { system_prompt: promptText });
      const integration = await getIntegrationScript(clientId);
      setIntegrationScripts(prev => ({ ...prev, [purchaseId]: integration }));
      alert("System prompt saved successfully! Your chatbot is updated.");
    } catch (error) {
      console.error(error);
      alert(`Failed to save prompt: ${error.message || "Unknown error"}`);
    } finally {
      setSavingPrompt(prev => ({ ...prev, [clientId]: false }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="dashboard-loading" style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>
        <div className="loader" style={{ margin: '0 auto 20px' }}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const chatbotProducts = purchases.filter(isChatbotProduct);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '80vh' }}>
      <BackgroundAnimation />

      <div className="dashboard-container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'flex-start', // This ensures the sticky sidebar works correctly
        gap: '30px',
        position: 'relative',
        zIndex: 2
      }}>

        {/* 
          SIDEBAR
          We use position: sticky and height: calc(100vh - 80px)
          This makes it fill the screen height and follow you as you scroll 
        */}
        <aside style={{
          width: isMobile ? '100%' : '280px',
          flexShrink: 0,
          background: 'rgba(17, 24, 39, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          // STICKY LOGIC:
          position: isMobile ? 'static' : 'sticky',
          top: isMobile ? 'auto' : '20px', // Gap from top of browser window
          height: isMobile ? 'auto' : 'calc(100vh - 40px)', // Full screen height minus padding
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: '700' }}>Dashboard</h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginTop: '4px' }}>Welcome, {user.name}</p>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('chatbot')}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: activeTab === 'chatbot' ? 'linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: activeTab === 'chatbot' ? 'white' : '#9CA3AF',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'chatbot' ? '600' : '500'
              }}
            >
              <FaRobot size={18} /> AI Chatbot
            </button>

            <button
              onClick={() => navigate('/cart')}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: '#9CA3AF',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
            >
              <FaShoppingCart size={18} /> My Cart
            </button>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: '40px',
              padding: '14px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              color: '#F87171',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {loadingPurchases ? (
            <div className="content-section" style={{ textAlign: 'center', padding: '60px', background: 'rgba(17,24,39,0.5)', borderRadius: '16px' }}>
              <div className="loader" style={{ margin: '0 auto 20px' }}></div>
              <p style={{ color: '#D1D5DB' }}>Loading your subscriptions...</p>
            </div>
          ) : activeTab === 'chatbot' ? (
            <>
              <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '700', color: '#fff' }}>Configuration</h1>
                <p style={{ color: '#9CA3AF', fontSize: '1.05rem' }}>Define your AI's personality and get your integration code.</p>
              </header>

              {chatbotProducts.length === 0 ? (
                <div className="content-section" style={{ textAlign: 'center', padding: '60px', background: 'rgba(17, 24, 39, 0.6)', borderRadius: '16px', border: '1px solid #374151' }}>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <FaRobot size={40} color="#6366F1" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#fff' }}>No Active Chatbot Subscriptions</h3>
                  <p style={{ color: '#9CA3AF', marginBottom: '32px' }}>You need to purchase a chatbot plan to start configuring your AI.</p>
                  <button
                    className="primary-btn"
                    onClick={() => navigate('/products')}
                    style={{ padding: '12px 32px', fontSize: '1rem', cursor: 'pointer' }}
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                chatbotProducts.map(p => {
                  const clientId = getClientId(p);
                  const integration = integrationScripts[p._id];
                  const isSaving = savingPrompt[clientId] || false;

                  return (
                    <div key={p._id} style={{
                      background: 'rgba(17, 24, 39, 0.9)',
                      borderRadius: '20px',
                      border: '1px solid #374151',
                      padding: '32px',
                      marginBottom: '30px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>

                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #374151', paddingBottom: '20px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>{p.productSnapshot?.name || 'AI Chatbot'}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                            <span style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: p.status === 'completed' ? '#10B981' : '#F59E0B'
                            }}></span>
                            <span style={{ fontSize: '0.9rem', color: '#9CA3AF', textTransform: 'capitalize' }}>{p.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Prompt Config */}
                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E5E7EB', marginBottom: '12px', fontSize: '1rem', fontWeight: '600' }}>
                          <FaCog className="text-indigo-500" /> Configure Personality
                        </label>
                        <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '12px' }}>
                          Tell the AI how to behave (e.g., "You are a helpful support agent").
                        </p>
                        <textarea
                          value={promptInputs[clientId] !== undefined ? promptInputs[clientId] : ''}
                          onChange={(e) => handlePromptChange(clientId, e.target.value)}
                          placeholder="Enter system prompt here..."
                          style={{
                            width: '100%',
                            minHeight: '120px',
                            background: '#0B101F',
                            border: '1px solid #4B5563',
                            borderRadius: '12px',
                            padding: '16px',
                            color: '#fff',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            resize: 'vertical',
                            marginBottom: '16px',
                            fontFamily: 'inherit'
                          }}
                        />
                        <button
                          onClick={() => handleSaveSystemPrompt(clientId, p._id)}
                          disabled={isSaving}
                          className="primary-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            background: '#4F46E5',
                            color: 'white',
                            border: 'none',
                            opacity: isSaving ? 0.7 : 1,
                            cursor: isSaving ? 'wait' : 'pointer'
                          }}
                        >
                          {isSaving ? <div className="loader-sm"></div> : <FaSave />}
                          {isSaving ? 'Saving...' : 'Save Personality'}
                        </button>
                      </div>

                      {/* Client ID */}
                      <div style={{ marginBottom: '32px', padding: '20px', background: '#1F2937', borderRadius: '12px', border: '1px solid #374151' }}>
                        <label style={{ display: 'block', color: '#9CA3AF', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Your Client ID
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <code style={{
                            flex: 1,
                            minWidth: '200px',
                            color: '#10B981',
                            fontFamily: 'monospace',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            wordBreak: 'break-all'
                          }}>
                            {clientId || 'Processing...'}
                          </code>
                          <button
                            onClick={() => handleCopy(`client-${p._id}`, clientId)}
                            style={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              border: '1px solid rgba(16, 185, 129, 0.2)',
                              borderRadius: '8px',
                              color: '#10B981',
                              padding: '8px 16px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.2s'
                            }}
                          >
                            {copiedMap[`client-${p._id}`] ? <><FaCheck /> Copied</> : <><FaCopy /> Copy ID</>}
                          </button>
                        </div>
                      </div>

                      {/* Integration Code */}
                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E5E7EB', marginBottom: '12px', fontSize: '1rem', fontWeight: '600' }}>
                          <FaCode /> Integration Code
                        </label>

                        {integration?.scriptTag ? (
                          <div style={{ position: 'relative' }}>
                            <pre style={{
                              background: '#000',
                              padding: '24px',
                              borderRadius: '12px',
                              overflowX: 'auto',
                              border: '1px solid #374151',
                              margin: 0
                            }}>
                              <code style={{ color: '#D1D5DB', fontSize: '0.9rem', fontFamily: 'Consolas, Monaco, "Andale Mono", monospace', lineHeight: '1.6' }}>
                                {integration.scriptTag}
                              </code>
                            </pre>
                            <button
                              onClick={() => handleCopy(`script-${p._id}`, integration.scriptTag)}
                              style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: '#4F46E5',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                padding: '8px 12px',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            >
                              {copiedMap[`script-${p._id}`] ? <><FaCheck /> Copied</> : <><FaCopy /> Copy Code</>}
                            </button>
                          </div>
                        ) : (
                          <div style={{
                            padding: '20px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            borderRadius: '12px',
                            color: '#F59E0B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <FaExclamationTriangle />
                            <span>Please <strong>Save Personality</strong> above to generate your integration script.</span>
                          </div>
                        )}
                      </div>

                      {/* Dev Note */}
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.08)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        padding: '20px',
                        borderRadius: '12px',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start'
                      }}>
                        <FaInfoCircle style={{ color: '#60A5FA', fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <h4 style={{ color: '#93C5FD', margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>Developer Note</h4>
                          <p style={{ color: '#BFDBFE', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                            The <code>data-client-id</code> connects the widget to this specific bot.
                            To test as a fresh user, use an <strong>Incognito Window</strong>.
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;