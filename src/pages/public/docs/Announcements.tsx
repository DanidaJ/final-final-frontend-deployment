import { motion } from 'framer-motion';

const Announcements: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                        Announcements
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Stay updated with the latest news and important updates from our team.
                    </p>

                    <div className="space-y-6">
                        <ForumPost
                            title="Version 2.0 Released!"
                            author="Admin"
                            date="March 1, 2025"
                            excerpt="We’re excited to launch version 2.0 with new features and improvements!"
                        />
                        <ForumPost
                            title="Scheduled Maintenance"
                            author="Support Team"
                            date="Feb 28, 2025"
                            excerpt="We will be performing system maintenance on March 5th from 1 AM to 3 AM UTC."
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ForumPost: React.FC<{ title: string; author: string; date: string; excerpt: string }> = ({ title, author, date, excerpt }) => (
    <motion.div whileHover={{ y: -2 }} className="group relative">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{excerpt}</p>
        </div>
    </motion.div>
);

export default Announcements;
