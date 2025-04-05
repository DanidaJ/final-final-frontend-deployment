import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import StudentModal from '../../../components/modals/StudentModal'
import Modal from '../../../components/common/Modal'
import { Student } from '../../../types/student'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../contexts/AuthContext'

// Add interface for filters
interface Filters {
  searchQuery: string;
  level: string;
  intake: string;
  degree: string;
  studyMode: string;
}

export default function StudentsList() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<{_id: string, name: string} | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Add filter states
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    level: '',
    intake: '',
    degree: '',
    studyMode: ''
  })

  // Add states for unique filter options
  const [uniqueLevels, setUniqueLevels] = useState<string[]>([])
  const [uniqueIntakes, setUniqueIntakes] = useState<string[]>([])
  const [uniqueDegrees, setUniqueDegrees] = useState<string[]>([])

  // Add useEffect for extracting unique filter options
  useEffect(() => {
    if (students.length > 0) {
      const levels = Array.from(new Set(students.map(student => student.level)))
      const intakes = Array.from(new Set(students.map(student => student.intake)))
      const degrees = Array.from(new Set(students.map(student => student.degree_name)))
      
      setUniqueLevels(levels)
      setUniqueIntakes(intakes)
      setUniqueDegrees(degrees)
    }
  }, [students])

  // Add useEffect for filtering students
  useEffect(() => {
    let result = [...students]

    // Apply level filter
    if (filters.level) {
      result = result.filter(student => student.level === filters.level)
    }

    // Apply intake filter
    if (filters.intake) {
      result = result.filter(student => student.intake === filters.intake)
    }

    // Apply degree filter
    if (filters.degree) {
      result = result.filter(student => student.degree_name === filters.degree)
    }

    // Apply study mode filter
    if (filters.studyMode) {
      result = result.filter(student => student.study_mode === filters.studyMode)
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(student =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.iit_id.toLowerCase().includes(query)
      )
    }

    setFilteredStudents(result)
  }, [students, filters])

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
      searchQuery: '',
      level: '',
      intake: '',
      degree: '',
      studyMode: ''
    })
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchStudents()
  }, [isAuthenticated, navigate])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await api.get('/students')
      setStudents(response.data)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching students:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to fetch students'
      if (err.response?.status === 401) {
        await logout()
        navigate('/login', { state: { returnUrl: '/dashboard/lists/students' } })
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

  const handleCreateStudent = async (data: Omit<Student, '_id' | 'created_at' | 'updated_at'> & { optional_modules: string[] }) => {
    try {
      const response = await api.post('/students', {
        ...data,
        optional_modules: data.optional_modules || []
      })
      setStudents(prev => [...prev, response.data])
      setShowCreateModal(false)
      toast.success('Student added successfully')
    } catch (err: any) {
      console.error('Error adding student:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to add student'
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error
        
        // Make error messages more user-friendly
        if (errorMessage === "Email already exists") {
          errorMessage = "This email address is already registered. Please use a different email."
        } else if (errorMessage === "IIT ID already exists") {
          errorMessage = "This IIT ID is already in use. Please check and try again."
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const handleEditStudent = async (data: Omit<Student, '_id' | 'created_at' | 'updated_at'> & { optional_modules: string[] }) => {
    try {
      if (!selectedStudent) return
      const response = await api.put(`/students/${selectedStudent._id}`, {
        ...data,
        optional_modules: data.optional_modules || []
      })
      setStudents(prev => prev.map(student => 
        student._id === selectedStudent._id ? response.data : student
      ))
      setSelectedStudent(null)
      toast.success('Student updated successfully')
    } catch (err: any) {
      console.error('Error updating student:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to update student'
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

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete({ _id: student._id, name: `${student.first_name} ${student.last_name}` })
    setDeleteConfirmation('')
    setDeleteError(null)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return

    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    try {
      setIsDeleting(true)
      setDeleteError(null)
      await api.delete(`/students/${studentToDelete._id}`)
      setStudents(prev => prev.filter(student => student._id !== studentToDelete._id))
      setIsDeleteModalOpen(false)
      setStudentToDelete(null)
      setDeleteConfirmation('')
      toast.success('Student deleted successfully')
    } catch (err: any) {
      console.error('Error deleting student:', err)
      console.error('Error response:', err.response?.data)
      
      let errorMessage = 'Failed to delete student'
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
        title="Students"
        createButtonLabel="Add Student"
        onCreateClick={() => setShowCreateModal(true)}
      >
        {/* Add Filter Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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

            {/* Level Filter */}
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
                {uniqueLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Intake Filter */}
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

            {/* Degree Filter */}
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
                {uniqueDegrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>

            {/* Study Mode Filter */}
            <div>
              <label htmlFor="studyMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Study Mode
              </label>
              <select
                id="studyMode"
                value={filters.studyMode}
                onChange={(e) => handleFilterChange('studyMode', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Modes</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
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
            Showing {filteredStudents.length} of {students.length} students
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
                  IIT ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Intake
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.first_name} {student.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.iit_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.level}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.intake}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.group || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.degree_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.study_mode === 'Full-time'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {student.study_mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {student.contact_number || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      onClick={() => setSelectedStudent(student)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteClick(student)}
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

      <StudentModal
        isOpen={showCreateModal || !!selectedStudent}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedStudent(null)
        }}
        onSubmit={selectedStudent ? handleEditStudent : handleCreateStudent}
        initialData={selectedStudent}
        title={selectedStudent ? "Edit Student" : "Add New Student"}
      />

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

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Are you sure you want to delete this student?</p>
            <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
              {studentToDelete?.name}
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
                'Delete Student'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
} 