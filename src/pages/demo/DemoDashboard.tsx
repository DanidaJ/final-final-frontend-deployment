import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function DemoDashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg border border-blue-200 dark:border-blue-800 shadow-md dark:shadow-md-dark"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Demo Mode
            </h2>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This is a demo version of our university management system
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/register'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              shadow-sm hover:shadow-md transition-all duration-200 border border-transparent 
              hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:ring-offset-2 dark:focus:ring-offset-blue-900"
          >
            Register Now
          </button>
        </div>
      </motion.div>

      {/* Demo Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-md-dark
            border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-dark 
            transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Students</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Active enrollments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-md-dark
            border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-dark 
            transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Lecturers</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">56</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Teaching staff
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-md-dark
            border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-dark 
            transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Courses</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">89</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Active courses
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-md-dark
          border border-gray-200 dark:border-gray-700 mt-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1 
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Manage Schedule
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View and edit class schedules
            </p>
          </button>
          
          <button
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Resource Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage rooms and equipment
            </p>
          </button>
          
          <button
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Reports
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View analytics and reports
            </p>
          </button>
        </div>
      </motion.div>
    </div>
  )
} 