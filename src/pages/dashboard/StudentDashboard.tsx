import { useAuth } from '../../contexts/AuthContext'

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Student Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Schedule Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            My Schedule
          </h2>
          {/* Add schedule content */}
        </div>

        {/* Courses Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            My Courses
          </h2>
          {/* Add courses content */}
        </div>

        {/* Notifications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notifications
          </h2>
          {/* Add notifications content */}
        </div>
      </div>
    </div>
  )
} 