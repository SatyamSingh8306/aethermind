import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';
import '../styles/SupportPage.css';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const { hero, channels, resources } = pagesData.support;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="support-page">
      <BackgroundAnimation />
      <div className="support-hero">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </div>

      <div className="support-content">
        <div className="support-tabs">
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Support
          </button>
          <button
            className={`tab-btn ${activeTab === 'channels' ? 'active' : ''}`}
            onClick={() => setActiveTab('channels')}
          >
            Support Channels
          </button>
          <button
            className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'contact' && (
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="support-channels">
              {channels.map((channel, index) => (
                <div key={index} className="channel-card">
                  <h3>{channel.title}</h3>
                  <p>{channel.description}</p>
                  <div className="channel-details">
                    <div className="detail">
                      <span className="label">Contact:</span>
                      <span className="value">{channel.contact}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Response Time:</span>
                      <span className="value">{channel.responseTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="support-resources">
              {resources.map((resource, index) => (
                <div key={index} className="resource-card">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a href={resource.link} className="resource-link">
                    {resource.title === 'Documentation' ? 'View Documentation' :
                     resource.title === 'FAQ' ? 'View FAQ' : 'Join Forum'}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 