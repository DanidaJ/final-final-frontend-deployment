import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface IssueProps {
    number: string;
    title: string;
    description: string;
}


interface ViewedIssue {
    number: string;
    title: string;
    timestamp: number;
}

const COOKIE_OPTIONS = {
    expires: 7, // Cookie expires in 7 days
    secure: true,
    sameSite: 'strict' as const
};

const Troubleshoot: React.FC = () => {
    const [viewedIssues, setViewedIssues] = useState<ViewedIssue[]>([]);


    // Load user preferences and viewed issues on mount
    useEffect(() => {
        const savedViewedIssues = Cookies.get('chronotix_viewed_issues');


        if (savedViewedIssues) {
            setViewedIssues(JSON.parse(savedViewedIssues));
        }

    }, []);

    // Track viewed issues
    const handleIssueView = (number: string, title: string) => {
        const newViewedIssue: ViewedIssue = {
            number,
            title,
            timestamp: Date.now()
        };

        // Keep only the 5 most recent viewed issues
        const updatedViewedIssues = [
            newViewedIssue,
            ...viewedIssues.filter(issue => issue.number !== number)
        ].slice(0, 5);

        setViewedIssues(updatedViewedIssues);
        Cookies.set('chronotix_viewed_issues', JSON.stringify(updatedViewedIssues), COOKIE_OPTIONS);
    };

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
                            Troubleshooting ChronoTix
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Solve common issues quickly with this troubleshooting guide.
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
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                        Help Center
                                    </h2>
                                    <div className="grid gap-2">
                                        {docLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${link.href === '/docs/troubleshooting'
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                                                }
                          hover:shadow-md transform hover:-translate-y-[0.5px]`}
                                            >
                                                <div className={`${link.href === '/docs/troubleshooting'
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
                                        Common Issues & Solutions
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        If you encounter any problems, follow these solutions to resolve them quickly.
                                    </p>
                                </div>

                                {/* Issues List */}
                                <div className="grid gap-6">
                                    <Issue
                                        number="1"
                                        title="Timetable Not Loading"
                                        description="Refresh the page, clear cache, or check your internet connection."
                                        onView={handleIssueView}
                                    />
                                    <Issue
                                        number="2"
                                        title="Login Issues"
                                        description="Ensure you use the correct university credentials or reset your password."
                                        onView={handleIssueView}
                                    />
                                    <Issue
                                        number="3"
                                        title="Schedule Conflicts"
                                        description="Use the 'Request Change' feature to resolve overlapping sessions."
                                        onView={handleIssueView}
                                    />
                                    <Issue
                                        number="4"
                                        title="Missing Notifications"
                                        description="Enable notifications in your settings and check your spam folder."
                                        onView={handleIssueView}
                                    />
                                    <Issue
                                        number="5"
                                        title="Classroom Bookings Not Visible"
                                        description="Confirm that you have the necessary permissions to access booking details."
                                        onView={handleIssueView}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Issue Card Component
const Issue: React.FC<IssueProps & { onView: (number: string, title: string) => void }> = ({
    number,
    title,
    description,
    onView
}) => (
    <motion.div
        id={`issue-${number}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
        onViewportEnter={() => onView(number, title)}
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
        name: 'Getting Started',
        href: '/docs/getting-started',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        name: 'FAQ',
        href: '/docs/faq',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'Features',
        href: '/docs/features',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
    {
        name: 'Troubleshooting',
        href: '/docs/troubleshooting',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
    },
];

export default Troubleshoot;
