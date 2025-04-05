import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

interface VideoCardProps {
    title: string;
    videoUrl: string;
}

interface SidebarLinkProps {
    to: string;
    label: string;
    active?: boolean;
}

const VideoTutorials: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Gradient Background */}
            <div className="relative bg-white dark:bg-gray-900">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                            Video Tutorials
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Step-by-step video guides covering all aspects of the ChronoTix scheduling system.
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
                                        Resources
                                    </h2>
                                    <div className="grid gap-2">
                                        <SidebarLink to="/tutorials" label="Video Tutorials" active />
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
                                        Watch & Learn
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        These videos will guide you through the ChronoTix scheduling system, from setup to advanced features.
                                    </p>
                                </div>

                                {/* Video List */}
                                <div className="grid gap-6">
                                    <VideoCard title="Demonstration of ChronoTix" videoUrl="https://www.youtube.com/embed/vtnE7D2Lawg" />
                                    <VideoCard title="Thoughts from our End Users" videoUrl="https://www.youtube.com/embed/avoyHojKfHw" />
                                    <VideoCard title="Stay Tuned . . ." videoUrl="https://www.youtube.com/embed/mAfqHwc_Iw8" />
                                    <VideoCard title="🎓 Life before and after ChronoTix! " videoUrl="https://www.youtube.com/embed/kt1EeNFCdTI" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Video Card Component
const VideoCard: React.FC<VideoCardProps> = ({ title, videoUrl }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
    >
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {title}
            </h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                    className="w-full h-64 rounded-lg shadow-md"
                    src={videoUrl}
                    title={title}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </motion.div>
);

// Sidebar Link Component
const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${active 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                }
                hover:shadow-md transform hover:-translate-y-[0.5px]`}
    >
        <span className="ml-3">{label}</span>
    </Link>
);

export default VideoTutorials;
