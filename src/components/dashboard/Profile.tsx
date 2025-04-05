import { motion } from "framer-motion";

const ProfilePage = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"></div>
                <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 mask-gradient"></div>
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900 dark:to-transparent"></div>
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl text-center relative bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            Profile Information
                        </span>
                    </h1>
                </motion.div>

                {/* Profile Image & Name */}
                <div className="flex flex-col items-center mt-8">
                    <img
                        src="https://www.citypng.com/public/uploads/preview/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Tehan Pieris</h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">Software Engineering Student</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">IIT Number</h3>
                        <p className="text-gray-800 dark:text-gray-300">20231232</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">UOW Number</h3>
                        <p className="text-gray-800 dark:text-gray-300">W2723123</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Batch</h3>
                        <p className="text-gray-800 dark:text-gray-300">SE 23</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Tutorial Group</h3>
                        <p className="text-gray-800 dark:text-gray-300">SE-5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
