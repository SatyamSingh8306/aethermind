import React, { useState } from 'react';
import {
  FaChevronRight,
  FaCheckCircle,
  FaBook,
  FaCode,
  FaGraduationCap,
  FaClock,
  FaExternalLinkAlt
} from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import pagesData from '../data/pagesData.json';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const { hero, sections } = pagesData.documentation;
  const currentSection = sections[activeSection];

  // Icon mapping for sections
  const sectionIcons = {
    'getting-started': FaBook,
    'api-reference': FaCode,
    'tutorials': FaGraduationCap
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundAnimation />

      <div className="relative">
        {/* Hero Section */}
        <div className="border-b border-gray-800/50 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-6 border border-purple-500/20">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-sm font-semibold">
                Documentation
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              {hero.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {Object.keys(sections).map((sectionKey) => {
              const section = sections[sectionKey];
              const Icon = sectionIcons[sectionKey] || FaBook;
              const isActive = activeSection === sectionKey;

              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`
                    group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
                    ${isActive
                      ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-gray-900/50 border-gray-800 hover:border-purple-500/50 hover:bg-gray-900'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`
                      p-3 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500'
                        : 'bg-gray-800 group-hover:bg-purple-500/20'
                      }
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <FaChevronRight className={`
                      w-5 h-5 transition-all duration-300
                      ${isActive ? 'text-purple-400' : 'text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1'}
                    `} />
                  </div>
                  <h3 className={`
                    text-xl font-bold mb-2 transition-colors
                    ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {section.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Current Section Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-3 text-white">
                {currentSection.title}
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {currentSection.description}
              </p>
            </div>

            {/* Content Cards */}
            <div className="grid gap-6">
              {currentSection.content.map((item, index) => (
                <ContentCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Card Component
const ContentCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Card Header */}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {item.title}
              </h3>
            </div>
            {item.summary && (
              <p className="text-gray-400 leading-relaxed">
                {item.summary}
              </p>
            )}
          </div>

          {item.comingSoon && (
            <span className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-sm font-semibold text-yellow-400 whitespace-nowrap">
              Coming Soon
            </span>
          )}
        </div>

        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium mb-4 transition-colors"
            >
              <span>Key Features</span>
              <FaChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            <div className={`
              grid gap-3 transition-all duration-300 overflow-hidden
              ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              {item.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors"
                >
                  <FaCheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        {item.cta?.href && (
          <div className="mt-6">
            <a
              href={item.cta.href}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5 group/btn"
            >
              <span>{item.cta.label}</span>
              <FaExternalLinkAlt className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}

        {/* Coming Soon Message */}
        {item.comingSoon && !item.cta?.href && (
          <div className="mt-6 p-4 bg-yellow-500/5 border-l-4 border-yellow-500 rounded-r-xl">
            <div className="flex items-center gap-2 text-yellow-400">
              <FaClock className="w-4 h-4" />
              <p className="text-sm font-medium">
                Documentation is being finalized. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPage;