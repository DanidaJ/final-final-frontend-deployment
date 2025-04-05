import { useState } from 'react'

export default function RoomManagement() {
  const [showAddRoom, setShowAddRoom] = useState(false)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Room Management
          </h1>
          <button 
            onClick={() => setShowAddRoom(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Room
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Room Cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Room {101 + i}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Capacity: 30 students
                  </p>
                </div>
                <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Available
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Type:</span>
                  <span className="text-gray-900 dark:text-white">Lecture Hall</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Equipment:</span>
                  <span className="text-gray-900 dark:text-white">Projector, Whiteboard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Floor:</span>
                  <span className="text-gray-900 dark:text-white">1st Floor</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-200 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 