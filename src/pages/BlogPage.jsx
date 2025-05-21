import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';
import '../styles/BlogPage.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const { hero, categories, posts } = pagesData.blog;

  const filteredPosts = activeCategory === 'All Posts'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-page">
      <BackgroundAnimation />
      <div className="blog-hero">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </div>

      <div className="blog-content">
        <div className="blog-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-content">
                <span className="blog-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <button className="read-more">Read More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 