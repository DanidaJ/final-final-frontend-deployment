import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from 'framer-motion';

const ReportIssues: React.FC = () => {
    const [formData, setFormData] = useState({ name: "", email: "", issue: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Issue Reported: ", formData);
        alert("Your issue has been reported successfully!");
        setFormData({ name: "", email: "", issue: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 mx-4 sm:mx-8 rounded-2xl shadow-lg overflow-hidden"
            >
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                
                {/* Gradient Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/30 to-blue-500/30 blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-400/30 to-indigo-500/30 blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400/30 to-purple-500/30 blur-2xl"></div>
                </div>

                <div className="relative z-10 py-20 text-center">
                    <h1 className="text-5xl font-bold text-white mb-3">Report an Issue</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 mx-auto mb-5"></div>
                    <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                        Encountering a problem? Let us know so we can fix it!
                    </p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <motion.aside 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full md:w-1/4"
                >
                    <div className="sticky top-20 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200/50 dark:border-gray-700/50 pb-3">Help Center</h2>
                        <nav className="space-y-3 mt-4">
                            <SidebarLink to='/forum/issues' label="Contact Support" />
                        </nav>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <motion.main 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full md:w-3/4"
                >
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mr-4 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Submit Your Issue</h2>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                            Fill out the form below to report any technical issues, bugs, or concerns you have while using ChronoTix.
                        </p>

                        <motion.form 
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="group">
                                <label className="block text-gray-800 dark:text-white font-semibold mb-2">Your Name</label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg opacity-25 group-focus-within:opacity-100 transition-opacity blur-[1px]" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="relative w-full p-3 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-sm
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50
                                        text-gray-800 dark:text-white transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-gray-800 dark:text-white font-semibold mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg opacity-25 group-focus-within:opacity-100 transition-opacity blur-[1px]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="relative w-full p-3 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-sm
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50
                                        text-gray-800 dark:text-white transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-gray-800 dark:text-white font-semibold mb-2">Describe the Issue</label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg opacity-25 group-focus-within:opacity-100 transition-opacity blur-[1px]" />
                                    <textarea
                                        name="issue"
                                        value={formData.issue}
                                        onChange={handleChange}
                                        required
                                        className="relative w-full p-3 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-sm
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50
                                        text-gray-800 dark:text-white transition-all duration-200 h-32 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ y: -2 }}
                                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                    text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                                    dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600
                                    shadow-sm hover:shadow-md"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Submit Report
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

const SidebarLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <Link
        to={to}
        className="block px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                relative group overflow-hidden
                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                hover:text-blue-600 dark:hover:text-blue-400
                border border-gray-200/50 dark:border-gray-700/50 
                hover:border-blue-500/50 dark:hover:border-blue-500/50
                shadow-sm hover:shadow-md"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 font-medium">{label}</span>
    </Link>
);

export default ReportIssues;
