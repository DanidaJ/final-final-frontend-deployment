import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg border border-blue-200 dark:border-blue-800 shadow-md dark:shadow-md-dark"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Welcome back, {user?.first_name}!
            </h2>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Here's an overview of your university management system
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/dashboard/timetable')}
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
            onClick={() => navigate('/dashboard/modules')}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Manage Modules
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Add or edit course modules
            </p>
          </button>
          
          <button
            onClick={() => navigate('/dashboard/classes')}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Manage Classes
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Add or edit classes and their details
            </p>
          </button>
          
          <button
            onClick={() => navigate('/dashboard/groups')}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Manage Groups
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Add or edit student groups and their details
            </p>
          </button>
          
          <button
            onClick={() => navigate('/dashboard/degrees')}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-left
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
              border border-gray-200 dark:border-gray-600 hover:border-blue-400
              dark:hover:border-blue-500 group"
          >
            <h4 className="text-gray-800 dark:text-white font-medium mb-1
              group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Manage Degrees
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Add or edit degree programs and their details
            </p>
          </button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-md-dark
          border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New student registration
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Assignment submitted
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                15 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New announcement posted
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                1 hour ago
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 