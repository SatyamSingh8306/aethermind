import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';
import '../styles/FAQPage.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});
  const { hero, categories } = pagesData.faq;

  const toggleQuestion = (category, index) => {
    setOpenQuestions(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }));
  };

  return (
    <div className="faq-page">
      <BackgroundAnimation />
      <div className="faq-hero">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </div>

      <div className="faq-content">
        <div className="faq-categories">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="faq-questions">
          {categories[activeCategory].map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`question-btn ${openQuestions[`${activeCategory}-${index}`] ? 'open' : ''}`}
                onClick={() => toggleQuestion(activeCategory, index)}
              >
                {faq.question}
                <span className="toggle-icon">+</span>
              </button>
              <div className={`answer ${openQuestions[`${activeCategory}-${index}`] ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 