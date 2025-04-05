import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import ClassModal from '../../../components/modals/ClassModal'
import Modal from '../../../components/common/Modal'
import { Class } from '../../../types/class'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../contexts/AuthContext'

interface Filters {
  searchQuery: string;
  classType: string;
  location: string;
  status: string;
}

export default function ClassesList() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [classes, setClasses] = useState<Class[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<{_id: string, name: string} | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([])
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    classType: '',
    location: '',
    status: ''
  })
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([])
  const [uniqueClassTypes, setUniqueClassTypes] = useState<string[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchClasses()
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (classes.length > 0) {
      const locations = Array.from(new Set(classes.map(classItem => classItem.location)))
      const types = Array.from(new Set(classes.map(classItem => classItem.class_type)))
      setUniqueLocations(locations)
      setUniqueClassTypes(types)
    }
  }, [classes])

  useEffect(() => {
    let result = [...classes]

    if (filters.classType) {
      result = result.filter(classItem => classItem.class_type === filters.classType)
    }

    if (filters.location) {
      result = result.filter(classItem => classItem.location === filters.location)
    }

    if (filters.status) {
      result = result.filter(classItem => classItem.status === filters.status)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(classItem =>
        classItem.name.toLowerCase().includes(query) ||
        classItem.location.toLowerCase().includes(query) ||
        classItem.class_type.toLowerCase().includes(query)
      )
    }

    setFilteredClasses(result)
  }, [classes, filters])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const response = await api.get('/classes')
      setClasses(response.data)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching classes:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to fetch classes'
      if (err.response?.status === 401) {
        await logout()
        navigate('/login', { state: { returnUrl: '/dashboard/lists/classes' } })
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClass = async (data: Omit<Class, '_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await api.post('/classes', data)
      setClasses(prev => [...prev, response.data])
      setShowCreateModal(false)
      toast.success('Class added successfully')
    } catch (err: any) {
      console.error('Error adding class:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to add class'
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const handleEditClass = async (data: Omit<Class, '_id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!selectedClass) return
      const response = await api.put(`/classes/${selectedClass._id}`, data)
      setClasses(prev => prev.map(classItem => 
        classItem._id === selectedClass._id ? response.data : classItem
      ))
      setSelectedClass(null)
      toast.success('Class updated successfully')
    } catch (err: any) {
      console.error('Error updating class:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to update class'
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const handleDeleteClick = (classItem: Class) => {
    setClassToDelete({ _id: classItem._id, name: classItem.name })
    setDeleteConfirmation('')
    setDeleteError(null)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!classToDelete) return

    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    try {
      setIsDeleting(true)
      setDeleteError(null)
      await api.delete(`/classes/${classToDelete._id}`)
      setClasses(prev => prev.filter(classItem => classItem._id !== classToDelete._id))
      setIsDeleteModalOpen(false)
      setClassToDelete(null)
      setDeleteConfirmation('')
      toast.success('Class deleted successfully')
    } catch (err: any) {
      console.error('Error deleting class:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to delete class'
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setDeleteError(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      classType: '',
      location: '',
      status: ''
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
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
      </div>
    )
  }

  return (
    <>
      <BaseList
        title="Classes"
        createButtonLabel="Add Class"
        onCreateClick={() => setShowCreateModal(true)}
      >
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search by name, type, or location"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
            </div>

            <div>
              <label htmlFor="classType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Class Type
              </label>
              <select
                id="classType"
                value={filters.classType}
                onChange={(e) => handleFilterChange('classType', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Types</option>
                {uniqueClassTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <select
                id="location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Statuses</option>
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredClasses.length} of {classes.length} classes
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
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
              {filteredClasses.map((classItem) => (
                <motion.tr
                  key={classItem._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {classItem.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {classItem.class_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {classItem.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {classItem.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      classItem.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {classItem.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      onClick={() => setSelectedClass(classItem)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteClick(classItem)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseList>

      <ClassModal
        isOpen={showCreateModal || !!selectedClass}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedClass(null)
        }}
        onSubmit={selectedClass ? handleEditClass : handleCreateClass}
        initialData={selectedClass}
        title={selectedClass ? "Edit Class" : "Add New Class"}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        width="default"
      >
        <div className="p-6 space-y-6">
          {deleteError && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-200">
                    {deleteError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Are you sure you want to delete this class?</p>
            <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
              {classToDelete?.name}
            </p>
            <p className="mt-4">
              This action cannot be undone. Please type <span className="font-medium text-gray-900 dark:text-white">delete</span> to confirm.
            </p>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type 'delete' to confirm"
              className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={isDeleting || deleteConfirmation.toLowerCase() !== 'delete'}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Deleting...
                </span>
              ) : (
                'Delete Class'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
} 