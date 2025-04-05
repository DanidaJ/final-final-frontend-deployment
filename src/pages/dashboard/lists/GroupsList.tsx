import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import { Group, GroupFormData } from '../../../types/group'
import { useToast } from '../../../contexts/ToastContext'
import DeleteConfirmationModal from '../../../components/modals/DeleteConfirmationModal'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import axios from 'axios'
import { useAuth } from '../../../contexts/AuthContext'

// Mock data for testing when API is not available
const mockGroups: Group[] = [
  {
    _id: '1',
    group_no: 'G001',
    intake: 'September 2023',
    level: 'L4',
    degree: 'BSc Computer Science',
    capacity: 50,
    enrolled: 45,
    status: 'active',
    description: 'First year computer science students'
  },
  {
    _id: '2',
    group_no: 'G002',
    intake: 'January 2023',
    level: 'L5',
    degree: 'BSc Mathematics',
    capacity: 40,
    enrolled: 35,
    status: 'active',
    description: 'Second year mathematics students'
  }
]

// Set this to true to use mock data instead of API
const USE_MOCK_DATA = false

// Add this interface after the existing imports
interface Filters {
  searchQuery: string;
  level: string;
  degree: string;
  status: string;
  intake: string;
}

export default function GroupsList() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [degrees, setDegrees] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [formData, setFormData] = useState<GroupFormData>({
    group_no: '',
    intake: '',
    level: 'L4',
    degree: '',
    capacity: 30,
    enrolled: 0,
    status: 'active',
    description: ''
  })
  const { showToast } = useToast()

  // Add these new state variables
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    level: '',
    degree: '',
    status: '',
    intake: ''
  })
  const [uniqueIntakes, setUniqueIntakes] = useState<string[]>([])

  // Helper function to handle authentication errors
  const handleAuthError = useCallback(() => {
    showToast('Authentication required. Please log in again.', 'error')
    // Redirect to login page
    navigate('/login')
  }, [navigate, showToast])

  // Fetch degrees when component mounts
  useEffect(() => {
    fetchDegrees()
  }, [])

  const fetchDegrees = async () => {
    try {
      const response = await axios.get('/api/degrees')
      if (Array.isArray(response.data)) {
        setDegrees(response.data)
      }
    } catch (error) {
      console.error('Error fetching degrees:', error)
      showToast('Failed to load degrees', 'error')
    }
  }

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
          setGroups(mockGroups)
        })

    fetchGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, handleAuthError, showToast])

  const fetchGroups = async () => {
    setIsLoading(true)

    if (USE_MOCK_DATA) {
      // Use mock data for testing
      setTimeout(() => {
        setGroups(mockGroups)
        setIsLoading(false)
      }, 500) // Simulate network delay
      return
    }

    try {
      console.log('Fetching groups from API...')
      const token = localStorage.getItem('access_token')
      console.log('Using token:', token ? 'Token exists' : 'No token found')

      const response = await axios.get('/api/groups')
      console.log('API response:', response)

      // Ensure we're getting an array from the API
      const groupsData = response.data
      if (Array.isArray(groupsData)) {
        console.log('Received groups data:', groupsData)
        setGroups(groupsData)
      } else {
        console.error('API did not return an array:', groupsData)
        setGroups([])
        showToast('Invalid data format received from server', 'error')
      }
    } catch (error: any) {
      console.error('Error fetching groups:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // Fall back to mock data
        setGroups(mockGroups)
      } else {
        showToast('Failed to load groups. Please try again.', 'error')
        setGroups([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Add this effect to update unique intakes
  useEffect(() => {
    if (groups.length > 0) {
      const intakes = Array.from(new Set(groups.map(group => group.intake)))
      setUniqueIntakes(intakes)
    }
  }, [groups])

  // Add this effect to handle filtering
  useEffect(() => {
    let result = [...groups]

    if (filters.level) {
      result = result.filter(group => group.level === filters.level)
    }

    if (filters.degree) {
      result = result.filter(group => group.degree === filters.degree)
    }

    if (filters.status) {
      result = result.filter(group => group.status === filters.status)
    }

    if (filters.intake) {
      result = result.filter(group => group.intake === filters.intake)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(group =>
          group.group_no.toLowerCase().includes(query) ||
          group.degree.toLowerCase().includes(query) ||
          group.description?.toLowerCase().includes(query)
      )
    }

    setFilteredGroups(result)
  }, [groups, filters])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (USE_MOCK_DATA) {
      // Simulate API call with mock data
      setTimeout(() => {
        if (selectedGroup) {
          // Update existing group in mock data
          setGroups(groups.map(g => g._id === selectedGroup._id ? { ...formData, _id: selectedGroup._id } : g))
          showToast('Group updated successfully!', 'success')
        } else {
          // Add new group to mock data
          const newGroup: Group = {
            ...formData,
            _id: Math.random().toString(36).substring(2, 9)
          }
          setGroups([...groups, newGroup])
          showToast('Group created successfully!', 'success')
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

      if (selectedGroup && selectedGroup._id) {
        // Update existing group
        console.log(`Updating group with ID: ${selectedGroup._id}`)
        const response = await axios.put(`/api/groups/${selectedGroup._id}`, formData)
        console.log('Update response:', response.data)
        showToast('Group updated successfully!', 'success')
      } else {
        // Create new group
        console.log('Creating new group')
        const response = await axios.post('/api/groups', formData)
        console.log('Create response:', response.data)
        showToast('Group created successfully!', 'success')
      }

      // Refresh groups list
      fetchGroups()
      // Close modal
      setIsModalOpen(false)
      // Reset form
      resetForm()
    } catch (error: any) {
      console.error('Error saving group:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // If not authenticated, add to mock data instead
        if (selectedGroup) {
          // Update existing group in mock data
          setGroups(groups.map(g => g._id === selectedGroup._id ? { ...formData, _id: selectedGroup._id } : g))
        } else {
          // Add new group to mock data
          const newGroup: Group = {
            ...formData,
            _id: Math.random().toString(36).substring(2, 9)
          }
          setGroups([...groups, newGroup])
        }
        setIsModalOpen(false)
        resetForm()
      } else {
        const errorMessage = error.response?.data?.error || 'Failed to save group. Please try again.'
        showToast(errorMessage, 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (group: Group) => {
    setSelectedGroup(group)
    setFormData({
      group_no: group.group_no,
      intake: group.intake,
      level: group.level,
      degree: group.degree,
      capacity: group.capacity,
      enrolled: group.enrolled,
      status: group.status,
      description: group.description || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedGroup || !selectedGroup._id || deleteConfirmText !== 'delete') {
      return
    }

    setIsSubmitting(true)

    if (USE_MOCK_DATA) {
      // Simulate API call with mock data
      setTimeout(() => {
        setGroups(groups.filter(g => g._id !== selectedGroup._id))
        showToast('Group deleted successfully!', 'success')
        setIsDeleteModalOpen(false)
        setDeleteConfirmText('')
        setIsSubmitting(false)
      }, 500)
      return
    }

    try {
      console.log(`Deleting group with ID: ${selectedGroup._id}`)
      const token = localStorage.getItem('access_token')
      console.log('Using token:', token ? 'Token exists' : 'No token found')

      await axios.delete(`/api/groups/${selectedGroup._id}`)
      showToast('Group deleted successfully!', 'success')
      fetchGroups()
      setIsDeleteModalOpen(false)
      setDeleteConfirmText('')
    } catch (error: any) {
      console.error('Error deleting group:', error)
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.status === 401) {
        handleAuthError()
        // If not authenticated, remove from mock data instead
        setGroups(groups.filter(g => g._id !== selectedGroup._id))
        setIsDeleteModalOpen(false)
        setDeleteConfirmText('')
      } else {
        showToast('Failed to delete group. Please try again.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const openDeleteModal = (group: Group) => {
    setSelectedGroup(group)
    setIsDeleteModalOpen(true)
  }

  const resetForm = () => {
    setSelectedGroup(null)
    setFormData({
      group_no: '',
      intake: '',
      level: 'L4',
      degree: '',
      capacity: 30,
      enrolled: 0,
      status: 'active',
      description: ''
    })
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
      level: '',
      degree: '',
      status: '',
      intake: ''
    })
  }

  return (
      <div>
        <BaseList
            title="Groups"
            createButtonLabel="Add Group"
            onCreateClick={() => {
              resetForm()
              setIsModalOpen(true)
            }}
            isLoading={isLoading}
        >
          {/* Add the filters section */}
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <input
                    type="text"
                    id="search"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    placeholder="Search by group no, degree, or description"
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
                  {['L3', 'L4', 'L5', 'L6', 'L7'].map(level => (
                      <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Degree
                </label>
                <select
                    id="degree"
                    value={filters.degree}
                    onChange={(e) => handleFilterChange('degree', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Degrees</option>
                  {degrees.map(degree => (
                      <option key={degree._id} value={degree.name}>{degree.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="intake" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Intake
                </label>
                <select
                    id="intake"
                    value={filters.intake}
                    onChange={(e) => handleFilterChange('intake', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Intakes</option>
                  {uniqueIntakes.map(intake => (
                      <option key={intake} value={intake}>{intake}</option>
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
              Showing {filteredGroups.length} of {groups.length} groups
            </div>
          </div>

          {/* Update the existing content section to use filteredGroups */}
          {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner size="large" />
              </div>
          ) : filteredGroups.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <p className="mb-4">No groups found matching your filters.</p>
              </div>
          ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Group No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Intake
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Capacity
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
                  {Array.isArray(filteredGroups) && filteredGroups.map((group) => (
                      <motion.tr
                          key={group._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {group.group_no}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {group.intake}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {group.level}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {group.degree}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {group.enrolled}/{group.capacity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                              group.status === 'active'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                      >
                        {group.status.toUpperCase()}
                      </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                              onClick={() => handleEdit(group)}
                          >
                            Edit
                          </button>
                          <button
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              onClick={() => openDeleteModal(group)}
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </BaseList>

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedGroup ? 'Edit Group' : 'Add New Group'}
            width="wide"
        >
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div className="relative pb-4">
              <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                {selectedGroup ? "Update group information" : "Enter group details"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Please fill in all the required fields marked with an asterisk (*).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group No <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.group_no}
                    onChange={(e) => setFormData({ ...formData, group_no: e.target.value })}
                    className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                    required
                    placeholder="e.g. G001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Intake <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                    required
                    placeholder="e.g. September 2023"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="space-y-2">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                    id="degree"
                    name="degree"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select Degree</option>
                  {degrees.map((degree) => (
                      <option key={degree._id} value={degree.name}>
                        {degree.name}
                      </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Level <span className="text-red-500">*</span>
                </label>
                <select
                    id="level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as Group['level'] })}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="L3">L3</option>
                  <option value="L4">L4</option>
                  <option value="L5">L5</option>
                  <option value="L6">L6</option>
                  <option value="L7">L7</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                    required
                    min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Group['status'] })}
                    className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                    required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enrolled Students
              </label>
              <input
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
                  className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="block w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Enter group description (optional)"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-1.5 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="px-5 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <span className="flex items-center">
                  <LoadingSpinner size="small" className="mr-2" />
                      {selectedGroup ? 'Updating...' : 'Creating...'}
                </span>
                ) : (
                    selectedGroup ? 'Update Group' : 'Create Group'
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
            title="Delete Group"
            confirmText={deleteConfirmText}
            setConfirmText={setDeleteConfirmText}
            isLoading={isSubmitting}
        >
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the group <span className="font-semibold">{selectedGroup?.group_no}</span>?
            This action cannot be undone.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Type <span className="font-semibold">delete</span> to confirm.
          </p>
        </DeleteConfirmationModal>
      </div>
  )
}