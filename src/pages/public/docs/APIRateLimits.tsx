import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const APIRateLimits = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-900">
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                            API Rate Limits
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Understand ChronoTix's API rate limits and best practices for optimised usage.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
                {/* Sidebar */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-72 flex-shrink-0">
                    <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">API Documentation</h2>
                        <div className="grid gap-2">
                            {apiLinks.map((link) => (
                                <Link key={link.href} to={link.href} className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                    ${link.href === '/docs/rate-limits' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' :
                                    'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'}
                                    hover:shadow-md transform hover:-translate-y-[0.5px]`}>
                                    <div className={link.href === '/docs/rate-limits' ? 'text-white' : 'text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400'}>
                                        {link.icon}
                                    </div>
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50 w-full lg:w-[56rem]">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding Rate Limits</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        ChronoTix API enforces rate limits to ensure fair usage and system stability. These limits vary based on API tier and endpoint.
                    </p>

                    {/* Rate Limits Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-[#275aa3] dark:to-[#1f3b62] text-white">
                            <tr>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">API Tier</th>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">Requests per Minute</th>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">Requests per Hour</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-900 dark:text-gray-300">
                            <tr className="bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Free Tier</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">60</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">1000</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Pro Tier</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">200</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">5000</td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Enterprise</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Unlimited</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Unlimited</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Handling Rate Limits</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        If your application exceeds rate limits, API requests will return an HTTP `429 Too Many Requests` response.
                        To avoid disruptions, implement exponential backoff and retry strategies.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Best Practices for Managing Rate Limits</h3>
                    <ul className="text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside space-y-2">
                        <li>Monitor API usage and ensure requests are optimized.</li>
                        <li>Cache responses where possible to reduce redundant requests.</li>
                        <li>Use pagination and batch requests instead of frequent individual calls.</li>
                        <li>Implement exponential backoff when retrying failed requests.</li>
                        <li>Upgrade to a higher API tier if more requests are needed.</li>
                    </ul>
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

export default APIRateLimits;
