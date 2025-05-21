import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBookmark, FaHistory, FaCog, FaBell, FaChartLine, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const userStats = [
    { title: 'Saved Items', value: '12', icon: <FaBookmark />, color: '#6366F1' },
    { title: 'Recent Activity', value: '8', icon: <FaHistory />, color: '#10B981' },
    { title: 'Notifications', value: '3', icon: <FaBell />, color: '#F59E0B' },
    { title: 'Documents', value: '5', icon: <FaFileAlt />, color: '#EC4899' }
  ];

  const recentActivity = [
    { id: 1, action: 'Document Viewed', time: '2 hours ago', status: 'completed', details: 'Viewed product documentation' },
    { id: 2, action: 'Profile Updated', time: '1 day ago', status: 'completed', details: 'Updated contact information' },
    { id: 3, action: 'Support Ticket', time: '2 days ago', status: 'pending', details: 'Submitted technical support request' }
  ];

  const quickLinks = [
    { title: 'Documentation', icon: <FaFileAlt />, link: '/documentation', color: '#6366F1' },
    { title: 'Support', icon: <FaQuestionCircle />, link: '/support', color: '#10B981' },
    { title: 'Settings', icon: <FaCog />, link: '/settings', color: '#F59E0B' },
    { title: 'Profile', icon: <FaUser />, link: '/profile', color: '#EC4899' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.name}!</h1>
          <p>Here's your personalized dashboard</p>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className="role-badge">User</span>
            </div>
          </div>
          
          <nav className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine /> Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FaFileAlt /> Documents
            </button>
            <button 
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FaHistory /> Activity
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          <div className="stats-grid">
            {userStats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="content-sections">
            <div className="content-section">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <div className={`status-indicator ${activity.status}`}></div>
                    </div>
                    <div className="activity-details">
                      <div className="activity-main">
                        <h4>{activity.action}</h4>
                        <span className={`activity-status ${activity.status}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="activity-time">{activity.time}</p>
                      <p className="activity-description">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2>Quick Links</h2>
              <div className="quick-links-grid">
                {quickLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.link} 
                    className="quick-link-card"
                    style={{ borderColor: link.color }}
                  >
                    <div className="link-icon" style={{ color: link.color }}>
                      {link.icon}
                    </div>
                    <div className="link-content">
                      <h3>{link.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 