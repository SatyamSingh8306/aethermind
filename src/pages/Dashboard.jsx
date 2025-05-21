import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>AetherMind Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <h2>Welcome to your Dashboard</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          {/* Add more dashboard cards as needed */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 