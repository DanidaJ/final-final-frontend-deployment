import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const APIErrors = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-900">
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                            API Error Codes
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Understand ChronoTix API error responses and troubleshooting guidelines.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-72 flex-shrink-0"
                >
                    <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">API Documentation</h2>
                        <div className="grid gap-2">
                            {apiLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                        ${
                                        link.href === '/docs/errors'
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                                    }
                                        hover:shadow-md transform hover:-translate-y-[0.5px]`}
                                >
                                    <div
                                        className={
                                            link.href === '/docs/errors'
                                                ? 'text-white'
                                                : 'text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400'
                                        }
                                    >
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
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Common API Errors</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        When using the ChronoTix API, you may encounter errors due to invalid requests, authentication issues,
                        or exceeding rate limits. Below is a list of common API error codes and their meanings.
                    </p>

                    {/* Error Codes Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-[#275aa3] dark:to-[#1f3b62] text-white">
                            <tr>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">Error Code</th>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">Description</th>
                                <th className="p-4 text-left text-lg font-semibold border border-gray-300 dark:border-gray-700">Resolution</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-900 dark:text-gray-300">
                            <tr className="bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">400</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Bad Request - The request was malformed.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Ensure the request follows API documentation.</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">401</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Unauthorized - Missing or invalid API key.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Check and include a valid API key.</td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">403</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Forbidden - Insufficient permissions.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Verify user roles and permissions.</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">404</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Not Found - The requested resource does not exist.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Check if the endpoint and resource ID are correct.</td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">429</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Too Many Requests - Rate limit exceeded.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Implement rate limit handling strategies.</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                                <td className="p-4 border border-gray-300 dark:border-gray-700 font-semibold">500</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Internal Server Error - Unexpected issue on the server.</td>
                                <td className="p-4 border border-gray-300 dark:border-gray-700">Try again later or contact support.</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

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

export default APIErrors;
