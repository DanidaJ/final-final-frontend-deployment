import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState } from 'react';

const CaseStudies: React.FC = () => {

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-gray-900">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl"> Case Studies</h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">Real world success stories from our clients using ChronoTix. </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:w-72 flex-shrink-0"
                >
                    <div className="sticky top-20 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Help Center</h2>
                        <div className="grid gap-2">
                            {docLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                      ${link.href === '/docs/case-studies'
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                                    }
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
                </motion.aside>

                {/* Main Content */}
                <motion.main 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1"
                >
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mr-4 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Success Stories</h2>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                            Discover how ChronoTix has helped institutions optimize their scheduling and improve efficiency.
                        </p>

                        <div className="space-y-8">
                            <CaseStudy
                                title="University of Techland"
                                impact="Reduced scheduling conflicts by 85%"
                                description="By implementing ChronoTix, the University of Techland optimized lecture hall allocations and automated timetable generation, significantly reducing scheduling conflicts."
                                metric="85%"
                                metricLabel="Conflict Reduction"
                            />

                            <CaseStudy
                                title="Innovate High School"
                                impact="Saved 20+ hours of manual work weekly"
                                description="With ChronoTix, administrators at Innovate High School streamlined scheduling, saving over 20 hours of manual work per week."
                                metric="20+"
                                metricLabel="Hours Saved Weekly"
                            />

                            <CaseStudy
                                title="Informatics Institute of Technology"
                                impact="Enhanced student satisfaction"
                                description="Informatics Institute of Technology leveraged AI-driven scheduling, leading to improved student satisfaction and better resource utilization."
                                metric="94%"
                                metricLabel="Student Satisfaction"
                            />
                        </div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
};


const CaseStudy: React.FC<{
    title: string;
    impact: string;
    description: string;
    metric: string;
    metricLabel: string;
}> = ({ title, impact, description, metric, metricLabel }) => (
    <motion.div 
        whileHover={{ y: -2 }}
        className="group relative"
    >
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
            <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3">
                    Impact: {impact}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white p-6 rounded-xl shadow-md min-w-[140px] group-hover:shadow-lg transition-all duration-200">
                <span className="text-3xl font-bold">{metric}</span>
                <span className="text-sm mt-1 text-blue-100">{metricLabel}</span>
            </div>
        </div>
    </motion.div>
);

const docLinks = [
    {
        name: 'Case Studies',
        href: '/docs/case-studies',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        name: 'Education',
        href: '/education',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'Enterprise',
        href: '/enterprise',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },

];

export default CaseStudies;