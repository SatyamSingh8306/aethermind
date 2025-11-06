import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBell, FaBoxes, FaFileAlt, FaLifeRing, FaChevronRight } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/Dashboard.css';
import { fetchPurchases, fetchPurchasesSummary } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const u = JSON.parse(storedUser);
    setUser(u);
    if (!(u?.role === 'admin' || u?.role === 'superadmin')) {
      navigate('/dashboard');
      return;
    }
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [p, s] = await Promise.all([
          fetchPurchases({ limit: 50 }),
          fetchPurchasesSummary(),
        ]);
        setPurchases(Array.isArray(p) ? p : (p?.purchases || []));
        setSummary(s);
      } catch (e) {
        setPurchases([]);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };
    if (user) load();
  }, [user]);
    
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications([
        { id: 1, message: 'New project assigned', time: '10 min ago', read: false },
        { id: 2, message: 'System update available', time: '2 hours ago', read: true },
        { id: 3, message: 'Monthly report generated', time: '1 day ago', read: true }
      ]);
    }, 500);
  }, [navigate]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const stats = [
    { title: 'Total Purchases', value: String(purchases.length || 0), icon: <FaChartLine />, color: '#6366F1', trend: 'steady', change: '' },
    { title: 'Notifications', value: String(notifications.filter(n=>!n.read).length), icon: <FaBell />, color: '#EC4899', trend: 'steady', change: '' },
  ];

  const recentActivity = [
    { id: 1, action: 'Project Update', time: '2 hours ago', status: 'completed', details: 'Completed phase 1 of marketing site' },
    { id: 2, action: 'New Message', time: '5 hours ago', status: 'pending', details: 'Client requested changes to design' },
    { id: 3, action: 'Profile Update', time: '1 day ago', status: 'completed', details: 'Updated profile information' },
    { id: 4, action: 'New Task', time: '2 days ago', status: 'in-progress', details: 'Review quarterly analytics report' }
  ];

  return (
    <div className="dashboard">
      <BackgroundAnimation />
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="breadcrumb">Dashboard / Overview</div>
          <h1>Welcome back, <span className="highlight">{user.name}</span>!</h1>
          <p className="subtitle">Here's what's happening with your projects today</p>
        </div>
        <div className="header-actions">
          <div className="notification-bell">
            <FaBell />
            {notifications.some(n => !n.read) && <span className="notification-badge"></span>}
          </div>
          <div className="user-profile">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <span className="username">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--card-accent': stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <span className="stat-title">{stat.title}</span>
              <div className="stat-value-container">
                <span className="stat-value">{stat.value}</span>
                {stat.trend && (
                  <span className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'} {stat.change || ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine className="nav-icon" />
              <span>Overview</span>
              <FaChevronRight className="nav-chevron" />
            </button>
            <button 
              className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FaBoxes className="nav-icon" />
              <span>Projects</span>
              <FaChevronRight className="nav-chevron" />
            </button>
            <button 
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FaHistory className="nav-icon" />
              <span>Activity</span>
              <FaChevronRight className="nav-chevron" />
            </button>
            <button 
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <FaFileAlt className="nav-icon" />
              <span>Reports</span>
              <FaChevronRight className="nav-chevron" />
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog className="nav-icon" />
              <span>Settings</span>
              <FaChevronRight className="nav-chevron" />
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          <div className="content-row">
            <div className="content-section activity-section">
              <div className="section-header">
                <h2>Recent Purchases</h2>
                <span className="view-all">{loading ? 'Loading…' : ''}</span>
              </div>
              <div className="activity-list">
                {(purchases || []).map(p => (
                  <div key={p._id} className="activity-item">
                    <div className="activity-details">
                      <div className="activity-main" style={{ justifyContent: 'space-between' }}>
                        <h4>{p.productSnapshot?.name || 'Service'}</h4>
                        <span className={`activity-status ${p.status}`}>{p.status}</span>
                      </div>
                      <p className="activity-time">User: {p.user}</p>
                      <p className="activity-description">Amount: {(p.currency || 'usd').toUpperCase()} {p.amount}</p>
                    </div>
                  </div>
                ))}
                {(!purchases || purchases.length === 0) && !loading && (
                  <div className="activity-item"><div className="activity-details">No purchases found.</div></div>
                )}
              </div>
            </div>

            <div className="content-section quick-actions-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions-grid">
                <button className="quick-action">
                  <div className="action-icon" style={{ backgroundColor: '#EEF2FF' }}>
                    <FaStar style={{ color: '#6366F1' }} />
                  </div>
                  <span>Create Project</span>
                </button>
                <button className="quick-action">
                  <div className="action-icon" style={{ backgroundColor: '#F0FDF4' }}>
                    <FaUser style={{ color: '#10B981' }} />
                  </div>
                  <span>Add Team Member</span>
                </button>
                <button className="quick-action">
                  <div className="action-icon" style={{ backgroundColor: '#FEF2F2' }}>
                    <FaFileAlt style={{ color: '#EF4444' }} />
                  </div>
                  <span>Generate Report</span>
                </button>
                <button className="quick-action">
                  <div className="action-icon" style={{ backgroundColor: '#ECFDF5' }}>
                    <FaCog style={{ color: '#10B981' }} />
                  </div>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>

          <div className="content-section resources-section">
            <h2>Resources</h2>
            <div className="quick-links-grid">
              <a href="/products" className="quick-link-card">
                <div className="link-icon">
                  <FaBoxes />
                </div>
                <div className="link-content">
                  <h3>Browse Products</h3>
                  <p>Explore our product catalog</p>
                </div>
                <FaChevronRight className="link-arrow" />
              </a>
              <a href="/documentation" className="quick-link-card">
                <div className="link-icon">
                  <FaFileAlt />
                </div>
                <div className="link-content">
                  <h3>Documentation</h3>
                  <p>Technical guides and API references</p>
                </div>
                <FaChevronRight className="link-arrow" />
              </a>
              <a href="/support" className="quick-link-card">
                <div className="link-icon">
                  <FaLifeRing />
                </div>
                <div className="link-content">
                  <h3>Get Support</h3>
                  <p>Contact our support team</p>
                </div>
                <FaChevronRight className="link-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;