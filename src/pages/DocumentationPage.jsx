import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';
import '../styles/DocumentationPage.css';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const { sections } = pagesData.documentation;

  return (
    <div className="documentation-page">
      <BackgroundAnimation />
      <div className="doc-sidebar">
        <h2>Documentation</h2>
        <nav>
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              className={`sidebar-item ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {sections[section].title}
            </button>
          ))}
        </nav>
      </div>

      <div className="doc-content">
        <h1>{sections[activeSection].title}</h1>
        <div className="doc-sections">
          {sections[activeSection].content.map((item, index) => (
            <section key={index} className="doc-section">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <div className="doc-actions">
                <button className="doc-button">View Details</button>
                <button className="doc-button secondary">Download PDF</button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 