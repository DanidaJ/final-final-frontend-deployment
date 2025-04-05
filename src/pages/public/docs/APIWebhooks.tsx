import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const APIWebhooks = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-900">
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                            API Webhooks
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Learn how to receive real-time updates from ChronoTix via webhooks.
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
                                    ${link.href === '/docs/webhooks' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' :
                                    'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'}
                                    hover:shadow-md transform hover:-translate-y-[0.5px]`}>
                                    <div className={link.href === '/docs/webhooks' ? 'text-white' : 'text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400'}>
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
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What Are Webhooks?</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Webhooks provide a way for ChronoTix to send real-time updates to your application when specific events occur.
                        Instead of polling the API for changes, webhooks notify your system automatically, reducing latency and improving efficiency.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">How Webhooks Work</h3>
                    <ul className="text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside space-y-2">
                        <li>Your application provides a webhook URL where notifications should be sent.</li>
                        <li>ChronoTix sends an HTTP POST request to your webhook URL when an event occurs.</li>
                        <li>Your application processes the request and takes appropriate action.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Setting Up Webhooks</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        To configure webhooks in ChronoTix, follow these steps:
                    </p>
                    <ol className="text-gray-600 dark:text-gray-300 mt-2 list-decimal list-inside space-y-2">
                        <li>Go to the ChronoTix API dashboard.</li>
                        <li>Navigate to the "Webhooks" section and click "Create Webhook."</li>
                        <li>Enter your webhook URL and select the events you want to subscribe to.</li>
                        <li>Save your settings and verify that the webhook is receiving events.</li>
                    </ol>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Webhook Security</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        To ensure webhook requests are authentic, ChronoTix includes a signature header in every request.
                        Validate the signature using your secret key before processing the data.
                    </p>
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

export default APIWebhooks;
