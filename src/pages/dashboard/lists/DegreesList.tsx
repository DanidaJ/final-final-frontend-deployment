import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import { useToast } from '../../../contexts/ToastContext'
import DeleteConfirmationModal from '../../../components/modals/DeleteConfirmationModal'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import axios from 'axios'
import { useAuth } from '../../../contexts/AuthContext'
import { Degree, DegreeFormData } from '../../../types/degree'

// Mock data for testing when API is not available
const mockDegrees: Degree[] = [
  {
    _id: '1',
    name: 'Bachelor of Science in Computer Science',
    code: 'BSC-CS',
    level: 'Undergraduate',
    credits: 360,
    department: 'Computer Science',
    status: 'active',
    description: 'A comprehensive program covering software development, algorithms, and computer systems',
    modules: []
  },
  {
    _id: '2',
    name: 'Master of Science in Data Science',
    code: 'MSC-DS',
    level: 'Postgraduate',
    credits: 180,
    department: 'Computer Science',
    status: 'active',
    description: 'Advanced program focusing on data analysis, machine learning, and statistical methods',
    modules: []
  }
]

// Set this to true to use mock data instead of API
const USE_MOCK_DATA = false

// Add this interface after the existing imports
interface Filters {
  searchQuery: string;
  level: string;
  department: string;
  status: string;
}

export default function DegreesList() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null)
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [modules, setModules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [formData, setFormData] = useState<DegreeFormData>({
    name: '',
    code: '',
    level: 'Undergraduate',
    credits: 360,
    department: '',
    status: 'active',
    description: '',
    modules: []
  })
  const { showToast } = useToast()

  // Add these new state variables
  const [filteredDegrees, setFilteredDegrees] = useState<Degree[]>([])
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    level: '',
    department: '',
    status: ''
  })
  const [uniqueDepartments, setUniqueDepartments] = useState<string[]>([])

  // Helper function to handle authentication errors
  const handleAuthError = useCallback(() => {
    showToast('Authentication required. Please log in again.', 'error')
    // Redirect to login page
    navigate('/login')
  }, [navigate, showToast])

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      console.log('User not authenticated, redirecting to login')
      handleAuthError()
      return
    }

    // Check if token exists
    const token = localStorage.getItem('access_token')
    if (!token) {
      console.log('No access token found, redirecting to login')
      handleAuthError()
      return
    }
    console.log('User authenticated with token:', token.substring(0, 10) + '...')

    // Check server connection
    axios.get('/api/health')
        .then(response => {
          console.log('Server connection successful:', response.data)
        })
        .catch(error => {
          console.error('Server connection failed:', error)
          showToast('Failed to connect to server. Using mock data instead.', 'error')
          // If server is not available, fall back to mock data
          setDegrees(mockDegrees)
        })

    fetchDegrees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, handleAuthError, showToast])

  const fetchDegrees = async () => {
    setIsLoading(true)

    if (USE_MOCK_DATA) {
      // Use mock data for testing
      setTimeout(() => {
        setDegrees(mockDegrees)
        setIsLoading(false)
      }, 500) // Simulate network delay
      return
    }

    try {
      console.log('Fetching degrees from API...')
      const token = localStorage.getItem('access_token')
      console.log('Using token:', token ? 'Token exists' : 'No token found')

      const response = await axios.get('/api/degrees')
      console.log('API response:', response)

      // Ensure we're getting an array from the API
      const degreesData = response.data
      if (Array.isArray(degreesData)) {
        console.log('Received degrees data:', degreesData)
        setDegrees(degreesData)
      } else {
        console.error('API did not return an array:', degreesData)
        setDegrees([])
        showToast('Invalid data format received from server', 'error')
      }
    } catch (error: any) {
      console.error('Error fetching degrees:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // Fall back to mock data
        setDegrees(mockDegrees)
      } else {
        showToast('Failed to load degrees. Please try again.', 'error')
        setDegrees([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (USE_MOCK_DATA) {
      // Simulate API call with mock data
      setTimeout(() => {
        if (selectedDegree) {
          // Update existing degree in mock data
          setDegrees(degrees.map(d => d._id === selectedDegree._id ? { ...formData, _id: selectedDegree._id } : d))
          showToast('Degree updated successfully!', 'success')
        } else {
          // Add new degree to mock data
          const newDegree: Degree = {
            ...formData,
            _id: Math.random().toString(36).substring(2, 9)
          }
          setDegrees([...degrees, newDegree])
          showToast('Degree created successfully!', 'success')
        }
        setIsModalOpen(false)
        resetForm()
        setIsSubmitting(false)
      }, 500)
      return
    }

    try {
      console.log('Submitting form data:', formData)
      const token = localStorage.getItem('access_token')
      console.log('Using token:', token ? 'Token exists' : 'No token found')

      // Add duration field for backward compatibility with the API
      const apiData = {
        ...formData,
        duration: 3 // Default value for backward compatibility
      }

      if (selectedDegree && selectedDegree._id) {
        // Update existing degree
        console.log(`Updating degree with ID: ${selectedDegree._id}`)
        const response = await axios.put(`/api/degrees/${selectedDegree._id}`, apiData)
        console.log('Update response:', response.data)
        showToast('Degree updated successfully!', 'success')
      } else {
        // Create new degree
        console.log('Creating new degree')
        const response = await axios.post('/api/degrees', apiData)
        console.log('Create response:', response.data)
        showToast('Degree created successfully!', 'success')
      }

      // Refresh degrees list
      fetchDegrees()
      // Close modal
      setIsModalOpen(false)
      // Reset form
      resetForm()
    } catch (error: any) {
      console.error('Error saving degree:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // If not authenticated, add to mock data instead
        if (selectedDegree) {
          // Update existing degree in mock data
          setDegrees(degrees.map(d => d._id === selectedDegree._id ? { ...formData, _id: selectedDegree._id } : d))
        } else {
          // Add new degree to mock data
          const newDegree: Degree = {
            ...formData,
            _id: Math.random().toString(36).substring(2, 9)
          }
          setDegrees([...degrees, newDegree])
        }
        setIsModalOpen(false)
        resetForm()
      } else {
        const errorMessage = error.response?.data?.error || 'Failed to save degree. Please try again.'
        showToast(errorMessage, 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (degree: Degree) => {
    setSelectedDegree(degree)
    setFormData({
      name: degree.name,
      code: degree.code,
      level: degree.level,
      credits: degree.credits,
      department: degree.department,
      status: degree.status,
      description: degree.description || '',
      modules: degree.modules || []
    })
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedDegree || !selectedDegree._id || deleteConfirmText !== 'delete') {
      return
    }

    setIsSubmitting(true)

    if (USE_MOCK_DATA) {
      // Simulate API call with mock data
      setTimeout(() => {
        setDegrees(degrees.filter(d => d._id !== selectedDegree._id))
        showToast('Degree deleted successfully!', 'success')
        setIsDeleteModalOpen(false)
        setDeleteConfirmText('')
        setIsSubmitting(false)
      }, 500)
      return
    }

    try {
      console.log(`Deleting degree with ID: ${selectedDegree._id}`)
      const token = localStorage.getItem('access_token')
      console.log('Using token:', token ? 'Token exists' : 'No token found')

      await axios.delete(`/api/degrees/${selectedDegree._id}`)
      showToast('Degree deleted successfully!', 'success')
      fetchDegrees()
      setIsDeleteModalOpen(false)
      setDeleteConfirmText('')
    } catch (error: any) {
      console.error('Error deleting degree:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // If not authenticated, remove from mock data instead
        setDegrees(degrees.filter(d => d._id !== selectedDegree._id))
        setIsDeleteModalOpen(false)
        setDeleteConfirmText('')
      } else {
        showToast('Failed to delete degree. Please try again.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const openDeleteModal = (degree: Degree) => {
    setSelectedDegree(degree)
    setIsDeleteModalOpen(true)
  }

  const resetForm = () => {
    setSelectedDegree(null)
    setFormData({
      name: '',
      code: '',
      level: 'Undergraduate',
      credits: 360,
      department: '',
      status: 'active',
      description: '',
      modules: []
    })
  }

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/modules')
      if (Array.isArray(response.data)) {
        setModules(response.data)
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
      showToast('Failed to load modules', 'error')
    }
  }

  useEffect(() => {
    if (user) {
      fetchModules()
    }
  }, [user])

  // Add this effect to update unique departments
  useEffect(() => {
    if (degrees.length > 0) {
      const departments = Array.from(new Set(degrees.map(degree => degree.department)))
      setUniqueDepartments(departments)
    }
  }, [degrees])

  // Add this effect to handle filtering
  useEffect(() => {
    let result = [...degrees]

    if (filters.level) {
      result = result.filter(degree => degree.level === filters.level)
    }

    if (filters.department) {
      result = result.filter(degree => degree.department === filters.department)
    }

    if (filters.status) {
      result = result.filter(degree => degree.status === filters.status)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(degree =>
          degree.name.toLowerCase().includes(query) ||
          degree.code.toLowerCase().includes(query) ||
          degree.department.toLowerCase().includes(query) ||
          degree.description?.toLowerCase().includes(query)
      )
    }

    setFilteredDegrees(result)
  }, [degrees, filters])

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      level: '',
      department: '',
      status: ''
    })
  }

  return (
      <div>
        <BaseList
            title="Degrees"
            createButtonLabel="Add Degree"
            onCreateClick={() => {
              resetForm()
              setIsModalOpen(true)
            }}
            isLoading={isLoading}
        >
          {/* Add the filters section */}
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 mx-6">
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
                    placeholder="Search by name, code, or department"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Level
                </label>
                <select
                    id="level"
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Levels</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <select
                    id="department"
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map(department => (
                      <option key={department} value={department}>{department}</option>
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
              Showing {filteredDegrees.length} of {degrees.length} degrees
            </div>
          </div>

          {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner size="large" />
              </div>
          ) : filteredDegrees.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <p className="mb-4">No degrees found matching your filters.</p>
              </div>
          ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredDegrees.map((degree) => (
                      <motion.div
                          key={degree._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
                      >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            degree.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                        }`}
                    >
                      {degree.status.toUpperCase()}
                    </span>
                        </div>

                        {/* Colored Header */}
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-800"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 -mt-12 relative">
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                              {degree.name}
                            </h3>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {degree.code}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Level</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{degree.level}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Credits</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{degree.credits}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Department</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{degree.department}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Modules</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {degree.modules?.length || 0} Selected
                              </p>
                            </div>
                          </div>

                          {degree.description && (
                              <div className="mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {degree.description}
                                </p>
                              </div>
                          )}

                          {/* Actions */}
                          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => handleEdit(degree)}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                                onClick={() => openDeleteModal(degree)}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </div>
          )}
        </BaseList>

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedDegree ? 'Edit Degree' : 'Add New Degree'}
            width="wide"
        >
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
            <div className="relative pb-3">
              <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                {selectedDegree ? "Update degree information" : "Enter degree details"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Please fill in all the required fields marked with an asterisk (*).
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="relative pb-3 mb-4">
                <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2">
                  <label htmlFor="degree-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Degree Name <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="degree-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                      placeholder="e.g., Bachelor of Science in Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="degree-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Degree Code <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="degree-code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                      placeholder="e.g., BSC-CS"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="degree-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="degree-level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="degree-department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="degree-department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                      placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="degree-credits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Credits <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="number"
                      id="degree-credits"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                      min="0"
                      max="1000"
                      placeholder="e.g., 360"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="degree-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="degree-status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="degree-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                      id="degree-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="Enter degree description (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="relative pb-3 mb-4">
                <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
                  Module Selection
                </h3>
              </div>

              <div className="space-y-2">
                <label htmlFor="degree-modules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Modules <span className="text-red-500">*</span>
                </label>
                <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                  {modules.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 py-2 text-center">
                        No modules available. Please add modules first.
                      </p>
                  ) : (
                      modules.map((module) => (
                          <div key={module._id} className="flex items-center space-x-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <input
                                type="checkbox"
                                id={`module-${module._id}`}
                                checked={formData.modules.includes(module._id)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const updatedModules = e.target.checked
                                      ? [...formData.modules, module._id]
                                      : formData.modules.filter(id => id !== module._id)
                                  setFormData({ ...formData, modules: updatedModules })
                                }}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={`module-${module._id}`}
                                className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              {module.module_code} - {module.module_name}
                            </label>
                          </div>
                      ))
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Selected modules: {formData.modules.length}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <span className="flex items-center">
                  <LoadingSpinner size="small" className="mr-2" />
                      {selectedDegree ? 'Updating...' : 'Creating...'}
                </span>
                ) : (
                    selectedDegree ? 'Update Degree' : 'Create Degree'
                )}
              </button>
            </div>
          </form>
        </Modal>

        <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setDeleteConfirmText('')
            }}
            onConfirm={handleDelete}
            title="Delete Degree"
            confirmText={deleteConfirmText}
            setConfirmText={setDeleteConfirmText}
            isLoading={isSubmitting}
        >
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the degree <span className="font-semibold">{selectedDegree?.name}</span>?
            This action cannot be undone.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Type <span className="font-semibold">delete</span> to confirm.
          </p>
        </DeleteConfirmationModal>
      </div>
  )
}