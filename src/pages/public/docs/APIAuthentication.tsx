import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const APIAuthentication = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
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
                            API Authentication
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Learn how to authenticate API requests when integrating with ChronoTix.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
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
                                        API Documentation
                                    </h2>
                                    <div className="grid gap-2">
                                        {apiLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${link.href === '/api/auth'
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                                                }
                          hover:shadow-md transform hover:-translate-y-[0.5px]`}
                                            >
                                                <div className={`${link.href === '/api/auth'
                                                    ? 'text-white'
                                                    : 'text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400'
                                                }`}>
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

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 min-w-0"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
                            <div className="space-y-8">
                                {/* Introduction */}
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        Introduction
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        ChronoTix API requires authentication for secure access. This section covers how to authenticate using API keys and OAuth.
                                    </p>
                                </div>

                                {/* Authentication Methods */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* API Key Authentication */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
                                        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                API Key Authentication
                                            </h3>
                                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                                Generate an API key in your ChronoTix developer dashboard and include it in the request headers.
                                            </p>
                                            <code className="block mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                                                {`curl -H "Authorization: Bearer YOUR_API_KEY" https://api.chronotix.com/data`}
                                            </code>
                                        </div>
                                    </motion.div>

                                    {/* OAuth Authentication */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
                                        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                OAuth 2.0 Authentication
                                            </h3>
                                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                                Use OAuth 2.0 for token-based authentication. Request an access token using the following endpoint.
                                            </p>
                                            <code className="block mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                                                {`POST https://api.chronotix.com/oauth/token`}
                                            </code>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// API Sidebar Links
const apiLinks = [
    { name: 'Authentication', href: '/docs/auth', icon: '🔑' },
    { name: 'Endpoints', href: '/docs/endpoints', icon: '📡' },
    { name: 'Rate Limits', href: '/docs/rate-limits', icon: '⚡' },
    { name: 'Webhooks', href: '/docs/webhooks', icon: '🔔' },
    { name: 'Error Codes', href: '/docs/errors', icon: '🚨' },
];

export default APIAuthentication;
