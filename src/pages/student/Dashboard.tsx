import { useState } from 'react'
import SmallCalendar from '../../components/calendar/SmallCalendar'

export default function StudentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Student Dashboard
          </h1>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Today
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Timetable */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">My Timetable</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-4 min-w-[800px]">
                  {/* ... existing timetable content ... */}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Notifications</h2>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Room change for tomorrow's class: Now in Room 301
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <SmallCalendar 
            currentDate={currentDate}
            onDateSelect={(date) => setCurrentDate(date)}
          />

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
              <nav className="space-y-2">
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
                  View Schedule
                </a>
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
                  Room Availability
                </a>
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
                  Course Materials
                </a>
              </nav>
            </div>
          </div>

          {/* Room Availability */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Available Rooms</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900 rounded-md">
                  <span className="text-green-800 dark:text-green-200">Room 101</span>
                  <span className="text-green-600 dark:text-green-300">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 