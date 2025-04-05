import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface IntegrationGuide {
    id: string;
    title: string;
    description: string;
    icon: string;
    url: string;
}

const IntegrationGuidesContent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const integrations: IntegrationGuide[] = [
        {
            id: 'google-calendar',
            title: 'Google Calendar',
            description: 'Sync your timetable with Google Calendar for seamless schedule management.',
            icon: 'google',
            url: '/integrations/google-calendar'
        },
        {
            id: 'outlook',
            title: 'Microsoft Outlook',
            description: 'Connect your timetable with Outlook to manage schedules across platforms.',
            icon: 'outlook',
            url: '/integrations/outlook'
        },
        {
            id: 'slack',
            title: 'Slack',
            description: 'Get timetable notifications and updates directly in your Slack workspace.',
            icon: 'slack',
            url: '/integrations/slack'
        },
        {
            id: 'zoom',
            title: 'Zoom',
            description: 'Automatically generate Zoom meetings for your scheduled sessions.',
            icon: 'zoom',
            url: '/integrations/zoom'
        },
        {
            id: 'api',
            title: 'REST API',
            description: 'Connect your own applications using our comprehensive REST API.',
            icon: 'api',
            url: '/integrations/api'
        },
        {
            id: 'webhook',
            title: 'Webhooks',
            description: 'Set up custom event triggers and notifications via webhooks.',
            icon: 'webhook',
            url: '/integrations/webhooks'
        }
    ];

    const filteredIntegrations = integrations.filter(integration =>
        integration.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Gradient Background */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Integration Guides
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Connect your timetable scheduling system with other tools and platforms to enhance your workflow
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search integrations..."
                                    className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-600/50 rounded-xl py-3 px-4 pl-12 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                                    shadow-sm hover:shadow-md transition-all duration-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <svg 
                                    className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Integrations Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredIntegrations.map((integration, index) => (
                                <motion.a
                                    key={integration.id}
                                    href={integration.url}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    {/* Gradient Border Effect */}
                                    <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
                                    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                                        <div className="flex items-center mb-4">
                                            <div className="p-3 rounded-xl mr-4 bg-gray-50 dark:bg-gray-700 shadow-sm group-hover:shadow-md transition-shadow">
                                                <IconComponent type={integration.icon} />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {integration.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                                            {integration.description}
                                        </p>
                                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                                            <span>View guide</span>
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredIntegrations.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    No integrations found
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Try adjusting your search query or check back later for new integrations.
                                </p>
                            </motion.div>
                        )}

                        {/* Custom Integration CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-12 relative overflow-hidden rounded-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
                            <div className="relative p-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Need a custom integration?
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Don't see the integration you need? Our team can help you build custom integrations for your specific requirements.
                                </p>
                                <button className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                    text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                                    dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600
                                    shadow-sm hover:shadow-md transform hover:-translate-y-[1px]"
                                >
                                    Contact Support
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Icon Component with brand colors
const IconComponent: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
        case 'google':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                    <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
                    <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
                    <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
                </svg>
            );
        case 'outlook':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#0078D4" d="M13.2 12L24 17.5V6.5L13.2 12z"/>
                    <path fill="#0078D4" d="M0 4.3V19.7C0 21 1.1 22 2.3 22H13.2V2H2.3C1.1 2 0 3 0 4.3z"/>
                    <path fill="#00BCF2" d="M24 6.5V4.3C24 3 22.9 2 21.7 2H13.2V12L24 6.5z"/>
                    <path fill="#00BCF2" d="M13.2 12V22H21.7C22.9 22 24 21 24 19.7V17.5L13.2 12z"/>
                </svg>
            );
        case 'slack':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
                    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
                    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
            );
        case 'zoom':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#2D8CFF" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z"/>
                    <path fill="#FFF" d="M16.95 16.95H7.05a1 1 0 01-1-1V8.05a1 1 0 011-1h9.9a1 1 0 011 1v7.9a1 1 0 01-1 1zm-3-3.5l-3.9 2.6v-5.2l3.9 2.6z"/>
                </svg>
            );
        case 'api':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#FF5733" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <path fill="#FF5733" d="M8.821 15.875l-1.414-1.414 5.657-5.657 1.414 1.414zM9.879 9.879l1.414-1.414 4.243 4.243-1.414 1.414z"/>
                </svg>
            );
        case 'webhook':
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#7B68EE" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <path fill="#7B68EE" d="M13 6v5h5v2h-5v5h-2v-5H6v-2h5V6h2z"/>
                </svg>
            );
        default:
            return (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4A5568" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <path fill="#4A5568" d="M12 6v5h5v2h-5v5h-2v-5H5v-2h5V6h2z"/>
                </svg>
            );
    }
};

export default IntegrationGuidesContent;