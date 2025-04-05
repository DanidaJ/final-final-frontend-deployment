import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import ErrorBoundary from '../../../components/common/ErrorBoundary'
import axios from '../../../config/axios'
import { useNavigate } from 'react-router-dom'

interface TimeRange {
  start: string;
  end: string;
}

interface Lecturer {
  _id?: string
  id: number
  name: string
  email: string
  department: string
  specialization: string
  qualification: string
  joinDate: string
  status?: 'active' | 'on_leave' | 'inactive'
  contact: string
  officeHours: string | TimeRange
  lecturer_id: string
  lecture_type: string
  modules: string[]
  workTime: string | TimeRange
  preferredTime: string | TimeRange
  preferredDays: string[]
}

interface LecturerFormData {
  name: string
  email: string
  department: string
  specialization: string
  qualification: string
  status: 'active' | 'on_leave' | 'inactive'
  contact: string
  officeHours: string
  lecturer_id: string
  lecture_type: string
  modules: string[]
  workTime: string
  preferredTime: string
  preferredDays: string[]
}

interface Module {
  _id: string
  module_code: string
  module_name: string
  level: string
  department: string
  semester: string
  module_status: string
  is_optional: boolean
}

const mockLecturers: Lecturer[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    specialization: 'Artificial Intelligence',
    qualification: 'Ph.D. in Computer Science',
    joinDate: '2020-09-01',
    status: 'active',
    contact: '+1 (555) 123-4567',
    officeHours: 'Mon, Wed 10:00-12:00',
    lecturer_id: 'LEC001',
    lecture_type: 'CS-PHD',
    modules: ['CS301'],
    workTime: '40',
    preferredTime: '09:00-15:00',
    preferredDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    department: 'Mathematics',
    specialization: 'Applied Mathematics',
    qualification: 'Ph.D. in Mathematics',
    joinDate: '2019-01-15',
    status: 'active',
    contact: '+1 (555) 234-5678',
    officeHours: 'Tue-Thu 14:00-16:00',
    lecturer_id: 'LEC002',
    lecture_type: 'MATH-PHD',
    modules: ['MATH301'],
    workTime: '30',
    preferredTime: '09:00-15:00',
    preferredDays: ['Monday', 'Wednesday', 'Friday']
  }
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface LecturersListProps {
  isDemo?: boolean
}

// Add new interface for filters
interface Filters {
  department: string;
  status: string;
  module: string;
  searchQuery: string;
}

// Helper function to get status display class
const getStatusClass = (status: 'active' | 'on_leave' | 'inactive' | undefined) => {
  switch(status) {
    case 'active':
      return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'on_leave':
      return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
}

// Helper function to format status text
const formatStatus = (status: 'active' | 'on_leave' | 'inactive' | undefined) => {
  return (status || 'inactive').replace(/_/g, ' ')
}

function LecturersListContent({ isDemo = false }: LecturersListProps) {
  const navigate = useNavigate()
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  // Add filter states
  const [filters, setFilters] = useState<Filters>({
    department: '',
    status: '',
    module: '',
    searchQuery: ''
  })
  // Add unique departments state
  const [departments, setDepartments] = useState<string[]>([])
  const [formData, setFormData] = useState<LecturerFormData>({
    name: '',
    email: '',
    department: '',
    specialization: '',
    qualification: '',
    status: 'active',
    contact: '',
    officeHours: '',
    lecturer_id: '',
    lecture_type: '',
    modules: [],
    workTime: '',
    preferredTime: '',
    preferredDays: []
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [lecturerToDelete, setLecturerToDelete] = useState<{id: string | number, name: string} | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const user = localStorage.getItem('user')
    console.log('Current token:', token) // Debug log
    
    if (!token || !user) {
      console.log('No token or user found, redirecting to login') // Debug log
      setIsAuthenticated(false)
      navigate('/login', { state: { returnUrl: '/dashboard/lists/lecturers' } })
    } else {
      setIsAuthenticated(true)
      fetchLecturers() // Fetch data immediately if we have a token
    }
  }, [navigate])

  // Fetch lecturers when component mounts or demo status changes
  useEffect(() => {
    const fetchData = async () => {
      if (isDemo) {
        console.log('Demo mode, using mock data') // Debug log
        setLecturers(mockLecturers)
        return
      }

      if (!isAuthenticated) {
        console.log('Not authenticated, skipping fetch')
        return
      }

      try {
        await fetchLecturers()
      } catch (err: any) {
        console.error('Error fetching lecturers:', err)
        if (err.response?.status === 401) {
          setIsAuthenticated(false)
          navigate('/login', { state: { returnUrl: '/dashboard/lists/lecturers' } })
        } else {
          setError('Failed to fetch lecturers. Please try again later.')
        }
      }
    }

    fetchData()
  }, [isDemo, isAuthenticated, navigate])

  // Add useEffect to fetch modules
  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/modules')
      if (Array.isArray(response.data)) {
        setModules(response.data)
      }
    } catch (err) {
      console.error('Error fetching modules:', err)
    }
  }

  const fetchLecturers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = localStorage.getItem('access_token')
      console.log('Fetching lecturers with token:', token)

      const response = await axios.get('/api/lecturers')
      console.log('Raw API response:', response)
      console.log('Response data:', response.data)

      // Check the actual structure of the response
      const responseData = response.data.lecturers || response.data.data || response.data || []
      console.log('Response data to process:', responseData)

      // Transform the data to match our Lecturer interface
      const lecturersData = Array.isArray(responseData) ? responseData.map((lecturer: any) => {
        console.log('Processing lecturer:', lecturer)
        return {
          id: lecturer._id || lecturer.id,
          _id: lecturer._id || lecturer.id,
          name: `${lecturer.first_name || ''} ${lecturer.last_name || ''}`.trim(),
          email: lecturer.email || '',
          department: lecturer.department || '',
          specialization: lecturer.specialization || '',
          qualification: lecturer.qualification || '',
          joinDate: lecturer.join_date || new Date().toISOString().split('T')[0],
          status: lecturer.status || 'active',
          contact: lecturer.contact || '',
          officeHours: lecturer.office_hours ? 
            `${lecturer.office_hours.start || '10:00'}-${lecturer.office_hours.end || '12:00'}` : '',
          lecturer_id: lecturer.lecturer_id || '',
          lecture_type: lecturer.degree_code || '',
          modules: Array.isArray(lecturer.modules) ? lecturer.modules : [],
          workTime: lecturer.work_hours ? 
            `${lecturer.work_hours.start || '09:00'}-${lecturer.work_hours.end || '17:00'}` : '',
          preferredTime: lecturer.preferred_time || '',
          preferredDays: Array.isArray(lecturer.preferred_days) ? lecturer.preferred_days : []
        }
      }) : []

      console.log('Processed lecturers data:', lecturersData)
      
      if (lecturersData.length === 0 && isDemo) {
        console.log('No data found, using mock data')
        setLecturers(mockLecturers)
      } else {
        setLecturers(lecturersData)
      }
    } catch (err: any) {
      console.error('Error fetching lecturers:', err)
      console.error('Error response:', err.response?.data)
      
      if (err.response?.status === 401) {
        setIsAuthenticated(false)
        navigate('/login', { state: { returnUrl: '/dashboard/lists/lecturers' } })
      } else {
        const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message
        setError('Failed to fetch lecturers: ' + errorMessage)
        if (isDemo) {
          console.log('Error occurred, using mock data')
          setLecturers(mockLecturers)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Add useEffect for extracting unique departments
  useEffect(() => {
    if (lecturers.length > 0) {
      const uniqueDepartments = Array.from(new Set(lecturers.map(lecturer => lecturer.department)))
      setDepartments(uniqueDepartments)
    }
  }, [lecturers])

  // Add useEffect for filtering lecturers
  useEffect(() => {
    let result = [...lecturers]

    // Apply department filter
    if (filters.department) {
      result = result.filter(lecturer => lecturer.department === filters.department)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(lecturer => lecturer.status === filters.status)
    }

    // Apply module filter
    if (filters.module) {
      result = result.filter(lecturer => lecturer.modules.includes(filters.module))
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(lecturer =>
        lecturer.name.toLowerCase().includes(query) ||
        lecturer.email.toLowerCase().includes(query) ||
        lecturer.lecturer_id.toLowerCase().includes(query)
      )
    }

    setFilteredLecturers(result)
  }, [lecturers, filters])

  // Add handler for filter changes
  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  // Add reset filters function
  const resetFilters = () => {
    setFilters({
      department: '',
      status: '',
      module: '',
      searchQuery: ''
    })
  }

  const handleAddLecturer = () => {
    setSelectedLecturer(null)
    setFormData({
      name: '',
      email: '',
      department: '',
      specialization: '',
      qualification: '',
      status: 'active',
      contact: '',
      officeHours: '',
      lecturer_id: '',
      lecture_type: '',
      modules: [],
      workTime: '',
      preferredTime: '',
      preferredDays: []
    })
    setIsModalOpen(true)
  }

  const handleEditLecturer = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer)
    // Format the preferred time if it's an object
    const preferredTime = typeof lecturer.preferredTime === 'object' 
      ? `${lecturer.preferredTime.start || '09:00'}-${lecturer.preferredTime.end || '15:00'}`
      : lecturer.preferredTime || '09:00-15:00'

    // Format work hours if it's an object
    const workTime = typeof lecturer.workTime === 'object'
      ? `${lecturer.workTime.start || '09:00'}-${lecturer.workTime.end || '17:00'}`
      : lecturer.workTime || '09:00-17:00'

    // Format office hours if it's an object
    const officeHours = typeof lecturer.officeHours === 'object'
      ? `${lecturer.officeHours.start || '10:00'}-${lecturer.officeHours.end || '12:00'}`
      : lecturer.officeHours || '10:00-12:00'

    setFormData({
      name: lecturer.name,
      email: lecturer.email,
      department: lecturer.department,
      specialization: lecturer.specialization,
      qualification: lecturer.qualification,
      status: lecturer.status || 'active',
      contact: lecturer.contact,
      officeHours: officeHours,
      lecturer_id: lecturer.lecturer_id,
      lecture_type: lecturer.lecture_type,
      modules: lecturer.modules,
      workTime: workTime,
      preferredTime: preferredTime,
      preferredDays: lecturer.preferredDays || []
    })
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.name.trim()) {
      errors.push('Full name is required')
    } else if (formData.name.trim().split(' ').length < 1) {
      errors.push('Please enter at least a first name')
    }
    if (!formData.email.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email format')
    }
    if (!formData.lecturer_id.trim()) {
      errors.push('Lecturer ID is required')
    }
    if (!formData.department.trim()) {
      errors.push('Department is required')
    }
    if (!formData.contact.trim()) {
      errors.push('Contact number is required')
    }
    if (!formData.workTime) {
      errors.push('Work hours are required')
    }
    if (formData.preferredDays.length === 0) {
      errors.push('Please select at least one preferred day')
    }

    // Validate time formats
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    const workTimes = formData.workTime.split('-')
    const officeTimes = formData.officeHours.split('-')

    if (workTimes.length === 2) {
      if (!timeRegex.test(workTimes[0].trim()) || !timeRegex.test(workTimes[1].trim())) {
        errors.push('Work hours must be in HH:MM format')
      }
    }

    if (formData.officeHours && officeTimes.length === 2) {
      if (!timeRegex.test(officeTimes[0].trim()) || !timeRegex.test(officeTimes[1].trim())) {
        errors.push('Office hours must be in HH:MM format')
      }
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDemo) {
      console.log('Form submission disabled in demo mode')
      setIsModalOpen(false)
      return
    }

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Safely parse time ranges with default values
      const parseTimeRange = (timeString: string, defaultStart: string, defaultEnd: string) => {
        try {
          const [start, end] = timeString.split('-').map(t => t.trim())
          return {
            start: start || defaultStart,
            end: end || defaultEnd
          }
        } catch (error) {
          return { start: defaultStart, end: defaultEnd }
        }
      }

      // Parse all time ranges
      const workHours = parseTimeRange(formData.workTime, '09:00', '17:00')
      const officeHours = parseTimeRange(formData.officeHours, '10:00', '12:00')
      const preferredTime = parseTimeRange(formData.preferredTime, '09:00', '15:00')

      // Split the full name into first and last name
      const nameParts = formData.name.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')

      let response
      if (selectedLecturer?._id) {
        // Update existing lecturer
        const updateData = {
          first_name: firstName,
          last_name: lastName,
          email: formData.email.trim(),
          department: formData.department.trim(),
          specialization: formData.specialization.trim(),
          qualification: formData.qualification.trim(),
          degree_code: formData.lecture_type.trim(),
          modules: formData.modules,
          lecturer_id: formData.lecturer_id.trim(),
          status: formData.status,
          contact: formData.contact.trim(),
          work_hours: workHours,
          office_hours: officeHours,
          preferred_days: formData.preferredDays,
          preferred_time: preferredTime
        }
        
        console.log('Update data structure:', JSON.stringify(updateData, null, 2))
        response = await axios.put(`/api/lecturers/${selectedLecturer._id}`, updateData)
      } else {
        // Create new lecturer
        const createData = {
          first_name: firstName,
          last_name: lastName,
          email: formData.email.trim(),
          department: formData.department.trim(),
          specialization: formData.specialization.trim(),
          qualification: formData.qualification.trim(),
          degree_code: formData.lecture_type.trim(),
          modules: formData.modules,
          lecturer_id: formData.lecturer_id.trim(),
          status: formData.status,
          contact: formData.contact.trim(),
          work_hours: workHours,
          office_hours: officeHours,
          preferred_days: formData.preferredDays,
          preferred_time: preferredTime,
          join_date: new Date().toISOString().split('T')[0]
        }
        
        console.log('Create data structure:', JSON.stringify(createData, null, 2))
        response = await axios.post('/api/lecturers', createData)
      }

      console.log('API Response:', response.data)

      if (!response.data.success && response.data.message) {
        throw new Error(response.data.message)
      }

      // Show success message
      console.log('Lecturer successfully saved')
      setError(selectedLecturer ? 'Lecturer updated successfully' : 'Lecturer created successfully')
      setTimeout(() => setError(null), 3000)

      // Refresh the lecturers list immediately
      await fetchLecturers()
      
      // Close modal and reset form
      setIsModalOpen(false)
      setSelectedLecturer(null)
      setFormData({
        name: '',
        email: '',
        department: '',
        specialization: '',
        qualification: '',
        status: 'active',
        contact: '',
        officeHours: '',
        lecturer_id: '',
        lecture_type: '',
        modules: [],
        workTime: '',
        preferredTime: '',
        preferredDays: []
      })

    } catch (err: any) {
      console.error('Error saving lecturer:', err)
      console.error('Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: JSON.parse(err.config?.data || '{}')
        }
      })
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to save lecturer'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDayChange = (day: string) => {
    setFormData(prev => {
      if (prev.preferredDays.includes(day)) {
        return {
          ...prev,
          preferredDays: prev.preferredDays.filter(d => d !== day)
        }
      } else {
        return {
          ...prev,
          preferredDays: [...prev.preferredDays, day]
        }
      }
    })
  }

  const handleDeleteClick = (id: string | number, name: string) => {
    setLecturerToDelete({ id, name })
    setDeleteConfirmation('')
    setDeleteError(null)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    if (!lecturerToDelete) return

    try {
      setIsLoading(true)
      setDeleteError(null)
      console.log('Deleting lecturer with ID:', lecturerToDelete.id)
      await axios.delete(`/api/lecturers/${lecturerToDelete.id}`)
      console.log('Lecturer deleted successfully')
      
      // Close modal and reset state
      setIsDeleteModalOpen(false)
      setLecturerToDelete(null)
      setDeleteConfirmation('')
      
      // Show success notification
      setError('Lecturer deleted successfully')
      setTimeout(() => setError(null), 3000)
      
      // Refresh the lecturers list
      await fetchLecturers()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete lecturer'
      setDeleteError(errorMessage)
      console.error('Error deleting lecturer:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string | number) => {
    if (isDemo) {
      console.log('Delete action not available in demo mode')
      return
    }

    const lecturerToDelete = lecturers.find(l => l._id === id || l.id === id)
    if (!lecturerToDelete) return
    
    handleDeleteClick(id, lecturerToDelete.name)
  }

  const handleLogin = () => {
    navigate('/login', { state: { returnUrl: '/dashboard/lists/lecturers' } })
  }

  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600 dark:text-red-300">
                {error}
              </p>
              {!isAuthenticated && (
                <div className="mt-2">
                  <button
                    onClick={handleLogin}
                    className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <BaseList
        title="Lecturers"
        createButtonLabel="Add Lecturer"
        onCreateClick={handleAddLecturer}
      >
        {/* Add Filter Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search by name, email, or ID"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
            </div>

            {/* Department Filter */}
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
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
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
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Module Filter */}
            <div>
              <label htmlFor="module" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Module
              </label>
              <select
                id="module"
                value={filters.module}
                onChange={(e) => handleFilterChange('module', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Modules</option>
                {modules.map(module => (
                  <option key={module._id} value={module._id}>
                    {module.module_code} - {module.module_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredLecturers.length} of {lecturers.length} lecturers
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Lecturer ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Modules
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Array.isArray(filteredLecturers) && filteredLecturers.length > 0 ? (
                  filteredLecturers.map((lecturer) => (
                    <motion.tr 
                      key={lecturer._id || lecturer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {lecturer.lecturer_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {lecturer.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {lecturer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {lecturer.department}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {lecturer.lecture_type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {lecturer.modules.map(moduleId => {
                            const module = modules.find(m => m._id === moduleId);
                            return module ? module.module_code : moduleId;
                          }).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusClass(lecturer.status)}>
                          {formatStatus(lecturer.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditLecturer(lecturer)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(lecturer._id || lecturer.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      {isLoading ? 'Loading...' : 'No lecturers found matching the filters'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </BaseList>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedLecturer ? "Edit Lecturer" : "Add New Lecturer"}
        width="wide"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
          {error && (
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
          )}

          <div className="relative pb-3">
            <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
              {selectedLecturer ? "Update lecturer information" : "Enter lecturer details"}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please fill in all the required fields marked with an asterisk (*).
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-2">
                <label htmlFor="lecturer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lecturer ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lecturer_id"
                  name="lecturer_id"
                  required
                  value={formData.lecturer_id}
                  onChange={(e) => setFormData({ ...formData, lecturer_id: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  required
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lecture_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lecture Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lecture_type"
                  name="lecture_type"
                  required
                  value={formData.lecture_type}
                  onChange={(e) => setFormData({ ...formData, lecture_type: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="modules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Modules <span className="text-red-500">*</span>
                </label>
                <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                  {modules.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-2 text-center">
                      No modules available.
                    </p>
                  ) : (
                    modules.map((module) => (
                      <div key={module._id} className="flex items-center space-x-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <input
                          type="checkbox"
                          id={`module-${module._id}`}
                          checked={formData.modules.includes(module._id)}
                          onChange={(e) => {
                            const updatedModules = e.target.checked
                              ? [...formData.modules, module._id]
                              : formData.modules.filter(id => id !== module._id)
                            setFormData(prev => ({ ...prev, modules: updatedModules }))
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
              
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'on_leave' | 'inactive' })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="workTimeStart" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work Hours <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    id="workTimeStart"
                    name="workTimeStart"
                    required
                    value={formData.workTime.split('-')[0] || '09:00'}
                    onChange={(e) => {
                      const endTime = formData.workTime.split('-')[1] || '17:00'
                      setFormData({ ...formData, workTime: `${e.target.value}-${endTime}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="time"
                    id="workTimeEnd"
                    name="workTimeEnd"
                    required
                    value={formData.workTime.split('-')[1] || '17:00'}
                    onChange={(e) => {
                      const startTime = formData.workTime.split('-')[0] || '09:00'
                      setFormData({ ...formData, workTime: `${startTime}-${e.target.value}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="preferredTimeStart" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Time Range <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    id="preferredTimeStart"
                    name="preferredTimeStart"
                    required
                    value={formData.preferredTime.split('-')[0] || '09:00'}
                    onChange={(e) => {
                      const endTime = formData.preferredTime.split('-')[1] || '15:00'
                      setFormData({ ...formData, preferredTime: `${e.target.value}-${endTime}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="time"
                    id="preferredTimeEnd"
                    name="preferredTimeEnd"
                    required
                    value={formData.preferredTime.split('-')[1] || '15:00'}
                    onChange={(e) => {
                      const startTime = formData.preferredTime.split('-')[0] || '09:00'
                      setFormData({ ...formData, preferredTime: `${startTime}-${e.target.value}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="officeHoursStart" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Office Hours <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    id="officeHoursStart"
                    name="officeHoursStart"
                    required
                    value={formData.officeHours.split('-')[0] || '10:00'}
                    onChange={(e) => {
                      const endTime = formData.officeHours.split('-')[1] || '12:00'
                      setFormData({ ...formData, officeHours: `${e.target.value}-${endTime}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="time"
                    id="officeHoursEnd"
                    name="officeHoursEnd"
                    required
                    value={formData.officeHours.split('-')[1] || '12:00'}
                    onChange={(e) => {
                      const startTime = formData.officeHours.split('-')[0] || '10:00'
                      setFormData({ ...formData, officeHours: `${startTime}-${e.target.value}` })
                    }}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Preferred Days <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {daysOfWeek.map(day => (
                  <label key={day} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferredDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {selectedLecturer ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                selectedLecturer ? 'Update Lecturer' : 'Add Lecturer'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
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
          
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
              Delete Lecturer
            </h3>
            
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete <span className="font-semibold">{lecturerToDelete?.name}</span>? This action cannot be undone.
            </p>
            
            <div className="mt-6">
              <label htmlFor="delete-confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-2">
                Type "delete" to confirm:
              </label>
              <input
                type="text"
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                placeholder="Type 'delete' to confirm"
              />
            </div>
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
              disabled={isLoading || deleteConfirmation.toLowerCase() !== 'delete'}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Deleting...
                </span>
              ) : (
                'Delete Lecturer'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default function LecturersList(props: LecturersListProps) {
  return (
    <ErrorBoundary>
      <LecturersListContent {...props} />
    </ErrorBoundary>
  )
} 