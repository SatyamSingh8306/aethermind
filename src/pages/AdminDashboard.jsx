import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    if (userData.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard admin-dashboard">
      <nav className="dashboard-nav">
        <h1>AetherMind Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin {user.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <h2>Admin Controls</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Admin Profile</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          <div className="dashboard-card">
            <h3>User Management</h3>
            <p>Total Users: 2</p>
            <button className="admin-button">Manage Users</button>
          </div>
          <div className="dashboard-card">
            <h3>System Status</h3>
            <p>Status: Active</p>
            <button className="admin-button">View Logs</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 