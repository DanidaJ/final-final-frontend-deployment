import { useAuth } from '../../contexts/AuthContext'

export default function StaffDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Staff Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Teaching Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Teaching Schedule
          </h2>
          {/* Add schedule content */}
        </div>

        {/* Room Assignments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Room Assignments
          </h2>
          {/* Add room assignments content */}
        </div>

        {/* Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Schedule Requests
          </h2>
          {/* Add requests content */}
        </div>
      </div>
    </div>
  )
} 