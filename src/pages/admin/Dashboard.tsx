import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
          dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.first_name}!
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Here's what's happening with your university today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 
              hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Students</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              +12%
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            From 1,102 last semester
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Active Courses</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Current
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">89</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Across all departments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Faculty Members</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Updated
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">156</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Full-time and part-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Success Rate</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Trending
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">92%</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Average graduation rate
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 
              dark:hover:bg-gray-700 transition-colors duration-200">
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg 
                bg-blue-50 dark:bg-blue-900">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" 
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Add New Course
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a new course entry
                </p>
              </div>
            </button>

            <button className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 
              dark:hover:bg-gray-700 transition-colors duration-200">
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg 
                bg-green-50 dark:bg-green-900">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" 
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Generate Report
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a new analytics report
                </p>
              </div>
            </button>

            <button className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 
              dark:hover:bg-gray-700 transition-colors duration-200">
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg 
                bg-purple-50 dark:bg-purple-900">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" 
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Schedule Event
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Plan a new academic event
                </p>
              </div>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 
            dark:border-gray-700 md:col-span-2 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="w-8 h-8 flex items-center justify-center rounded-full 
                  bg-blue-100 dark:bg-blue-900">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" 
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New Course Added
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Advanced Mathematics (MATH301) was added to the curriculum
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="w-8 h-8 flex items-center justify-center rounded-full 
                  bg-green-100 dark:bg-green-900">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" 
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Grade Submission Complete
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All faculty members have submitted their grades for the semester
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  5 hours ago
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 