import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

interface DocLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface DocSection {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const APIDocumentation = () => {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section with Gradient Background */}
        <div className="bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
          <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
              <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                        API Documentation
                    </h1>
              <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                Comprehensive guide for developers integrating with ChronoTix API
                    </p>
            </motion.div>
                </div>
            </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-72 flex-shrink-0"
            >
              <div className="sticky top-24">
                <nav className="space-y-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      API Reference
                    </h2>
                    <div className="grid gap-2">
                      {apiLinks.map((link) => (
                          <Link
                              key={link.href}
                              to={link.href}
                              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          hover:shadow-md transform hover:-translate-y-[0.5px]`}
                          >
                            <div className="text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400">
                              {link.icon}
                            </div>
                            <span className="ml-3">{link.name}</span>
                          </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 min-w-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      ChronoTix API Overview
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Learn how to authenticate, retrieve data, and integrate with the ChronoTix API.
                    </p>
                                        </div>

                  {/* API Documentation Sections */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {apiSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {section.title}
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {section.description}
                            </p>
                            </div>
                        </motion.div>
                    ))}
                    </div>
            </div>
        </div>
            </motion.div>
        </div>
        </div>
        </div>
    );
};

// API Links Data
const apiLinks: DocLink[] = [
  { name: 'Authentication', href: '/docs/auth', icon: '🔑' },
  { name: 'Endpoints', href: '/docs/endpoints', icon: '📡' },
  { name: 'Rate Limits', href: '/docs/rate-limits', icon: '⚡' },
  { name: 'Webhooks', href: '/docs/webhooks', icon: '🔔' },
  { name: 'Error Codes', href: '/docs/errors', icon: '🚨' },
];

// API Documentation Sections Data
const apiSections: DocSection[] = [
  { title: 'Getting Started', description: 'How to set up API keys and make your first request.', icon: '🚀' },
  { title: 'Authentication', description: 'Understand authentication methods and security best practices.', icon: '🔐' },
  { title: 'API Endpoints', description: 'Explore available API endpoints and their usage.', icon: '📡' },
  { title: 'Webhooks', description: 'Learn how to set up and manage real-time webhooks.', icon: '🔔' },
];

export default APIDocumentation;
