import { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import { Class } from '../../types/class'

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Class, '_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: Class | null;
  title: string;
}

export default function ClassModal({ isOpen, onClose, onSubmit, initialData, title }: ClassModalProps) {
  const [formData, setFormData] = useState<Omit<Class, '_id' | 'created_at' | 'updated_at'>>({
    name: '',
    class_type: 'Lecture',
    capacity: 30,
    location: '',
    status: 'active',
    description: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        class_type: initialData.class_type,
        capacity: initialData.capacity,
        location: initialData.location,
        status: initialData.status,
        description: initialData.description || ''
      })
    } else {
      // Reset form when adding a new class
      setFormData({
        name: '',
        class_type: 'Lecture',
        capacity: 30,
        location: '',
        status: 'active',
        description: ''
      })
    }
    setError(null)
  }, [initialData, isOpen])

  const validateForm = () => {
    const errors = []
    if (!formData.name.trim()) errors.push('Name is required')
    if (!formData.location.trim()) errors.push('Location is required')
    if (!formData.capacity || formData.capacity <= 0) errors.push('Capacity must be a positive number')
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await onSubmit(formData)
      onClose()
    } catch (err: any) {
      console.error('Error submitting class:', err)
      setError(err.message || 'Failed to save class')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Clear error when user starts typing
    if (error) setError(null)
    
    if (name === 'capacity') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width="wide"
    >
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-3 mb-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative pb-4">
          <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
            {initialData ? "Update class information" : "Enter class details"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Please fill in all the required fields marked with an asterisk (*).
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
            required
            placeholder="Enter class name"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label htmlFor="class_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class Type <span className="text-red-500">*</span>
            </label>
            <select
              id="class_type"
              name="class_type"
              value={formData.class_type}
              onChange={handleChange}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
            >
              <option value="Lecture">Lecture</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Lab">Lab</option>
              <option value="Seminar">Seminar</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
            required
            placeholder="Room number or location"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
            placeholder="Enter class description (optional)"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {initialData ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              initialData ? 'Update Class' : 'Create Class'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
} 