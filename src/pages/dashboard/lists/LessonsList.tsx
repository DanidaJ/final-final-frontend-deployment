import { useState } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'

interface Lesson {
  id: number
  module: string
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
  room: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
}

const mockLessons: Lesson[] = [
  {
    id: 1,
    module: 'Mathematics',
    class: '10A',
    teacher: 'John Doe',
    dayOfWeek: 'Monday',
    startTime: '08:00',
    endTime: '09:30',
    room: 'Room 101',
    status: 'scheduled'
  },
  {
    id: 2,
    module: 'Physics',
    class: '10B',
    teacher: 'Jane Smith',
    dayOfWeek: 'Monday',
    startTime: '10:00',
    endTime: '11:30',
    room: 'Room 102',
    status: 'ongoing'
  }
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function LessonsList() {
  const [lessons] = useState<Lesson[]>(mockLessons)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const getStatusColor = (status: Lesson['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return ''
    }
  }

  return (
    <>
      <BaseList
        title="Lessons"
        createButtonLabel="Add Lesson"
        onCreateClick={() => setShowCreateModal(true)}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {lessons.map((lesson) => (
                <motion.tr
                  key={lesson.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {lesson.module}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lesson.teacher}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {lesson.class}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {lesson.dayOfWeek}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lesson.startTime} - {lesson.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {lesson.room}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lesson.status)}`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedLesson(lesson)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseList>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || !!selectedLesson}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedLesson(null)
        }}
        title={selectedLesson ? 'Edit Lesson' : 'Add Lesson'}
      >
        <LessonForm
          lesson={selectedLesson}
          onSubmit={(data) => {
            console.log('Form submitted:', data)
            setShowCreateModal(false)
            setSelectedLesson(null)
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setSelectedLesson(null)
          }}
        />
      </Modal>
    </>
  )
}

interface LessonFormProps {
  lesson?: Lesson | null
  onSubmit: (data: Partial<Lesson>) => void
  onCancel: () => void
}

function LessonForm({ lesson, onSubmit, onCancel }: LessonFormProps) {
  const [formData, setFormData] = useState({
    module: lesson?.module || '',
    class: lesson?.class || '',
    teacher: lesson?.teacher || '',
    dayOfWeek: lesson?.dayOfWeek || '',
    startTime: lesson?.startTime || '',
    endTime: lesson?.endTime || '',
    room: lesson?.room || '',
    status: lesson?.status || 'scheduled'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="module" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Module <span className="text-red-500">*</span>
          </label>
          <select
            id="module"
            name="module"
            required
            value={formData.module}
            onChange={(e) => setFormData({ ...formData, module: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a module</option>
            <option value="Introduction to Computer Science">Introduction to Computer Science</option>
            <option value="Advanced Calculus">Advanced Calculus</option>
            <option value="Physics 101">Physics 101</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Class
          </label>
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Class</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Teacher
        </label>
        <select
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Teacher</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Day
          </label>
          <select
            value={formData.dayOfWeek}
            onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Day</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Room
          </label>
          <select
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Room</option>
            <option value="Room 101">Room 101</option>
            <option value="Room 102">Room 102</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {lesson ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
} 