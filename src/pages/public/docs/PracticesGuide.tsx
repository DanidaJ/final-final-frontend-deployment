import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

interface PracticeProps {
    number: string;
    title: string;
    description: string;
}



const PracticesGuide: React.FC = () => {
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
                            Best Practices for Using ChronoTix
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Follow these best practices to maximize efficiency and get the most out of ChronoTix.
                        </p>
                    </motion.div>
                </div>
            </div>

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
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Guides
                                    </h2>
                                    <div className="space-y-2">
                                        {docLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                          text-gray-600 hover:text-blue-600 hover:bg-blue-50
                          dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50"
                                            >
                                                {link.icon}
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
                                        Maximizing Your ChronoTix Experience
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        To ensure a smooth experience with ChronoTix, consider these best practices.
                                    </p>
                                </div>

                                {/* Practices List */}
                                <div className="grid gap-6">
                                    <Practice number="1" title="Keep Your Profile Updated" description="Ensure your role and preferences are always up to date to receive the most accurate schedules." />
                                    <Practice number="2" title="Check Notifications Regularly" description="Stay informed about schedule updates, room changes, and important announcements." />
                                    <Practice number="3" title="Use the Request Change Feature Wisely" description="Only request changes when absolutely necessary to maintain scheduling efficiency." />
                                    <Practice number="4" title="Integrate with Your Calendar" description="Sync your timetable with Google Calendar or Outlook to keep track of your commitments easily." />
                                    <Practice number="5" title="Utilize Filters & Preferences" description="Customize your schedule based on your needs, such as preferred class timings and break durations." />
                                    <Practice number="6" title="Report Issues Promptly" description="If you encounter any conflicts or system errors, report them immediately for a quick resolution." />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Practice Card Component
const Practice: React.FC<PracticeProps> = ({ number, title, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
    >
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold">
                    {number}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </motion.div>
);

// Documentation Links Data
const docLinks = [
    {
        name: 'Best Practices',
        href: '/best-practices',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        name: 'Pro Tips',
        href: '/docs/tips',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
];

export default PracticesGuide;
