import { useState } from 'react'

export default function ScheduleManagement() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Schedule Management
          </h1>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Schedule
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timetable Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-4 min-w-[800px]">
                  {/* Time slots */}
                  <div className="col-span-1">
                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Time</div>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-24 flex items-center justify-center border-b dark:border-gray-700">
                        {`${8 + i}:00`}
                      </div>
                    ))}
                  </div>
                  
                  {/* Days */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                    <div key={day} className="col-span-1">
                      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-4">{day}</div>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={`${day}-${i}`}
                          className="h-24 border border-gray-200 dark:border-gray-700 rounded-md p-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                          onClick={() => setSelectedSlot(`${day}-${i}`)}
                        >
                          {/* Add class info here */}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Class Assignment */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Assign Class
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Course
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Teacher
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                      <option>Dr. Smith</option>
                      <option>Prof. Johnson</option>
                      <option>Mrs. Williams</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Room
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                      <option>Room 101</option>
                      <option>Room 102</option>
                      <option>Lab 1</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Assign
                  </button>
                </form>
              </div>
            </div>

            {/* Conflicts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Conflicts
                </h2>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-900 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Room 101 double booked on Monday 10:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 