import { motion } from 'framer-motion';
import { useState } from 'react';

interface Resource {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  category: 'Getting Started' | 'Documentation' | 'Tutorials' | 'API Reference' | 'Best Practices' | 'Community' | 'Success Stories' | 'Technical' | 'Training' | 'Resources';
  readTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

const resources: Resource[] = [
  {
    title: 'Getting Started Guide',
    description: 'A comprehensive guide to help you get up and running with ChronoTix scheduling system.',
    category: 'Getting Started',
    readTime: '10 min',
    difficulty: 'Beginner',
    link: '/docs/getting-started',
    icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
  },
  {
    title: 'API Documentation',
    description: 'Detailed API documentation for developers integrating with ChronoTix.',
    category: 'Documentation',
    readTime: '30 min',
    difficulty: 'Advanced',
    link: '/docs/api',
    icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides covering all aspects of the scheduling system.',
    category: 'Tutorials',
    readTime: '45 min',
    difficulty: 'Intermediate',
    link: '/tutorials',
    icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    ),
  },
  {
    title: 'Best Practices Guide',
    description: 'Learn the recommended ways to use our platform effectively.',
    category: 'Documentation',
    link: '/best-practices',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users and share experiences.',
    category: 'Community',
    link: '/forum',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
    ),
  },
  {
    title: 'Case Studies',
    description: 'Real-world success stories from our clients.',
    category: 'Success Stories',
    link: '/case-studies',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
    ),
  },
  {
    title: 'Integration Guides',
    description: 'Learn how to integrate with other tools and systems.',
    category: 'Technical',
    link: '/integrations',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
    ),
  },
  {
    title: 'Webinars & Events',
    description: 'Join our live sessions and learning events.',
    category: 'Training',
    link: '/events',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    ),
  },
  {
    title: 'Templates Library',
    description: 'Ready-to-use templates for various scenarios.',
    category: 'Resources',
    link: '/templates',
    icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
    ),
  },
];

const categories = Array.from(new Set(resources.map(r => r.category)));

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter resources based on search term
  const filteredResources = resources.filter(resource => {
    const searchTermLower = searchTerm.toLowerCase();
    const title = resource.title || '';
    const description = resource.description || '';

    return (
        title.toLowerCase().includes(searchTermLower) ||
        description.toLowerCase().includes(searchTermLower)
    );
  });

  // Handle search icon click (clear the search)
  const handleSearchIconClick = () => {
    setSearchTerm('');
  };

  return (
      <div className="min-h-screen-without-nav bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header Section */}
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative mb-20"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl transform -skew-y-2"></div>
              <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 mask-gradient"></div>
            </div>

            <div className="relative py-12 px-4">
            <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Resources
            </span>
              <h1 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Learning Resources
              </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Explore our comprehensive collection of guides, tutorials, and documentation to help you master ChronoTix.
              </p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                shadow-sm dark:shadow-md-dark"
              />

              {/* Search Icon */}
              <div
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={handleSearchIconClick} // Clear search when clicked
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          {categories.map((category, categoryIndex) => {
            // Filter the resources based on the search term and category
            const filteredCategoryResources = filteredResources.filter(resource => resource.category === category);

            if (filteredCategoryResources.length === 0) return null; // Skip empty categories

            return (
                <div key={category} className="mb-16">
                  <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
                  >
                    {category}
                  </motion.h2>

                  <div className="space-y-12 mt-8">
                    {filteredCategoryResources.map((resource, index) => (
                        <motion.a
                            key={resource.title}
                            href={resource.link}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-center bg-white dark:bg-gray-800 rounded-xl p-6
                              border border-gray-100 dark:border-gray-700
                              shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                              hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                              transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Icon */}
                          <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg
                            text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50
                            transition-colors duration-300"
                          >
                            {resource.icon}
                          </div>

                          {/* Text Content */}
                          <div className="ml-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2
                            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            >
                              {resource.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {resource.description}
                            </p>

                            {/* Read time and Difficulty */}
                            <div className="flex items-center space-x-4 text-sm">
                              {resource.readTime && (
                                  <span className="text-gray-500 dark:text-gray-400">
                                    <i className="fas fa-clock mr-2"></i>
                                    {resource.readTime}
                                  </span>
                              )}
                              {resource.difficulty && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                                      resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                          'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}
                                  >
                              {resource.difficulty}
                                  </span>
                              )}
                            </div>
                          </div>
                        </motion.a>
                    ))}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}
