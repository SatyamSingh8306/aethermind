import React, { useState } from 'react';
import { FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';
import '../styles/DocumentationPage.css';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const { hero, sections } = pagesData.documentation;
  const currentSection = sections[activeSection];

  return (
    <div className="documentation-page">
      <BackgroundAnimation />
      <aside className="doc-sidebar">
        <h2>Documentation</h2>
        <nav>
          {Object.keys(sections).map((sectionKey) => (
            <button
              key={sectionKey}
              className={`sidebar-item ${activeSection === sectionKey ? 'active' : ''}`}
              onClick={() => setActiveSection(sectionKey)}
            >
              {sections[sectionKey].title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="doc-content">
        <header className="doc-hero">
          <span className="doc-badge">Docs</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
        </header>

        <div className="doc-section-wrapper">
          <div className="section-header">
            <div>
              <h2>{currentSection.title}</h2>
              {currentSection.description && <p>{currentSection.description}</p>}
            </div>
          </div>

          <div className="doc-sections">
            {currentSection.content.map((item, index) => (
              <section key={index} className="doc-section">
                <div className="doc-section-header">
                  <div>
                    <h3>{item.title}</h3>
                    {item.summary && <p className="doc-section-summary">{item.summary}</p>}
                  </div>
                  {item.comingSoon && <span className="doc-chip">Coming soon</span>}
                </div>

                {item.highlights?.length > 0 && (
                  <ul className="doc-highlights">
                    {item.highlights.map((point) => (
                      <li key={point}>
                        <FaCheckCircle />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.cta?.href && (
                  <div className="doc-actions">
                    <a
                      href={item.cta.href}
                      className="doc-button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{item.cta.label}</span>
                      <FaChevronRight />
                    </a>
                  </div>
                )}

                {item.comingSoon && !item.cta?.href && (
                  <p className="doc-coming-soon-note">
                    Documentation is being finalized. Check back shortly.
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;