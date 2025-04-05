import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const docLinks = [
    { name: "All Discussions", href: "/forum", icon: "📖" },
    { name: "Technical Support", href: "/tech-support", icon: "❓" },
    { name: "Feature Requests", href: "/feature-requests", icon: "🛠" },
    { name: "Announcements", href: "/announcements", icon: "📞" },
];

const CommunityForum: React.FC = () => {


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-gray-900">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">Community Forum</h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">Connect with other users, share experiences, and discuss best practices</p>
                    </motion.div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">

                {/* Sidebar Navigation */}
                <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:w-72 flex-shrink-0">
                    <div className="sticky top-20 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Help Center</h2>
                        <div className="grid gap-2">
                            {docLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                        text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                                        dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50
                                        hover:shadow-md transform hover:-translate-y-[0.5px]`}
                                >
                                    <div className="text-gray-400 dark:text-gray-500">{link.icon}</div>
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex-1">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mr-4 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Join the Conversation</h2>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                        Engage with the ChronoTix community. Share your experiences, ask questions, and find solutions.
                    </p>

                        <div className="space-y-6">
                            <ForumPost
                                title="Welcome to the Forum!"
                                author="Admin"
                                date="March 1, 2025"
                                excerpt="Get started by introducing yourself to the community!"
                            />
                            <ForumPost
                                title="Best Scheduling Practices"
                                author="Jane Doe"
                                date="Feb 28, 2025"
                                excerpt="How do you optimize your timetable for maximum efficiency?"
                            />
                            <ForumPost
                                title="Issue with Notifications"
                                author="John Smith"
                                date="Feb 27, 2025"
                                excerpt="Is anyone else experiencing delayed notifications?"
                            />
                        </div>

                        {/* Create Post CTA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 relative overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
                            <div className="relative p-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Start a New Discussion
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Have a question or want to share your experience? Create a new post and engage with the community.
                                </p>
                                <button className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                    text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                                    dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600
                                    shadow-sm hover:shadow-md transform hover:-translate-y-[1px]"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create New Post
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

const ForumPost: React.FC<{ title: string; author: string; date: string; excerpt: string }> = ({ title, author, date, excerpt }) => (
    <motion.div whileHover={{ y: -2 }} className="group relative">
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{excerpt}</p>
    </div>
    </motion.div>
);

export default CommunityForum;
