import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../contexts/AuthContext'

interface Exam {
  _id: string
  moduleCode: string
  moduleName: string
  examType: 'ICT 1' | 'ICT 2' | 'Written Exam' | 'Mock Test'
  level: 'Level 4' | 'Level 5' | 'Level 6' | 'Level 7' | 'Foundation'
  date: string
  startTime: string
  endTime: string
  description: string
  moduleLeader: string
  venueLink: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
}

// Add new interface for filters
interface Filters {
  examType: string;
  level: string;
  status: string;
  searchQuery: string;
}

export default function ExamsList() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [exams, setExams] = useState<Exam[]>([])
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  // Add filter states
  const [filters, setFilters] = useState<Filters>({
    examType: '',
    level: '',
    status: '',
    searchQuery: ''
  })

  // Add state for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [examToDelete, setExamToDelete] = useState<{id: string, name: string} | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      toast.error('Please log in to view exams')
      navigate('/login')
      return
    }

    // If authenticated, fetch exams
    fetchExams()
  }, [isAuthenticated, user, navigate])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const data = await api.getExams()
      setExams(data)
    } catch (error: any) {
      console.error('Failed to fetch exams:', error)
      const errorMessage = error.message || 'Failed to load exams'
      toast.error(errorMessage)

      if (error.status === 401) {
        toast.error('Session expired. Please log in again.')
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateExam = async (data: Partial<Exam>) => {
    try {
      await api.createExam(data)
      toast.success('Exam scheduled successfully')
      setShowCreateModal(false)
      fetchExams()
    } catch (error: any) {
      console.error('Failed to create exam:', error)
      const errorMessage = error.message || 'Failed to schedule exam'
      toast.error(errorMessage)

      if (error.status === 401) {
        toast.error('Please log in to schedule exams')
        navigate('/login')
      } else if (error.status === 400) {
        toast.error('Invalid exam data. Please check all required fields.')
      } else if (error.status === 403) {
        toast.error('You do not have permission to schedule exams')
      }
    }
  }

  const handleUpdateExam = async (data: Partial<Exam>) => {
    if (!selectedExam) return

    try {
      // Make sure we're sending a valid ID
      const examId = selectedExam._id
      if (!examId) {
        toast.error('Invalid exam ID')
        return
      }

      // Clone the data to avoid modifying the original
      const examData = { ...data }

      // Remove _id from the data to avoid conflicts
      if ('_id' in examData) {
        delete examData._id
      }

      await api.updateExam(examId, examData)
      toast.success('Exam updated successfully')
      setSelectedExam(null)
      fetchExams()
    } catch (error: any) {
      console.error('Failed to update exam:', error)
      const errorMessage = error.message || 'Failed to update exam'
      toast.error(errorMessage)

      if (error.status === 401) {
        toast.error('Please log in to update exams')
        navigate('/login')
      } else if (error.status === 404) {
        toast.error('Exam not found. It may have been deleted.')
        fetchExams() // Refresh the list to remove the deleted exam
      } else if (error.status === 400) {
        toast.error('Invalid exam data or ID format')
      }
    }
  }

  // Replace the simple window.confirm with a modal
  const handleDeleteClick = (id: string, name: string) => {
    setExamToDelete({ id, name })
    setDeleteConfirmation('')
    setDeleteError(null)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    if (!examToDelete) return

    try {
      setLoading(true)
      setDeleteError(null)
      console.log('Deleting exam with ID:', examToDelete.id)

      await api.deleteExam(examToDelete.id)
      console.log('Exam deleted successfully')

      // Close modal and reset state
      setIsDeleteModalOpen(false)
      setExamToDelete(null)
      setDeleteConfirmation('')

      // Show success notification
      toast.success('Exam deleted successfully')

      // Refresh the exams list
      await fetchExams()
    } catch (error: any) {
      console.error('Failed to delete exam:', error)
      const errorMessage = error.message || 'Failed to delete exam'
      setDeleteError(errorMessage)

      if (error.status === 401) {
        setDeleteError('Please log in to delete exams')
      } else if (error.status === 404) {
        setDeleteError('Exam not found. It may have been already deleted.')
        // Close the modal since the exam doesn't exist
        setTimeout(() => {
          setIsDeleteModalOpen(false)
          fetchExams() // Refresh the list
        }, 2000)
      } else if (error.status === 400) {
        setDeleteError('Invalid exam ID format')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string, name: string) => {
    handleDeleteClick(id, name)
  }

  const getStatusColor = (status: Exam['status']) => {
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

  const getExamTypeColor = (type: Exam['examType']) => {
    switch (type) {
      case 'ICT 1':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'
      case 'ICT 2':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100'
      case 'Written Exam':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100'
      case 'Mock Test':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100'
      default:
        return ''
    }
  }

  const getLevelColor = (level: Exam['level']) => {
    switch (level) {
      case 'Level 4':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100'
      case 'Level 5':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
      case 'Level 6':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100'
      case 'Level 7':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-800 dark:text-violet-100'
      case 'Foundation':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100'
      default:
        return ''
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Add useEffect for filtering exams
  useEffect(() => {
    let result = [...exams]

    // Apply exam type filter
    if (filters.examType) {
      result = result.filter(exam => exam.examType === filters.examType)
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter(exam => exam.level === filters.level)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(exam => exam.status === filters.status)
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(exam =>
          exam.moduleCode.toLowerCase().includes(query) ||
          exam.moduleName.toLowerCase().includes(query) ||
          exam.moduleLeader.toLowerCase().includes(query)
      )
    }

    setFilteredExams(result)
  }, [exams, filters])

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
      examType: '',
      level: '',
      status: '',
      searchQuery: ''
    })
  }

  return (
      <BaseList
          title="Exams"
          createButtonLabel="Schedule Exam"
          onCreateClick={() => setShowCreateModal(true)}
          isLoading={loading}
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
                  placeholder="Search by module code, name, or leader"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
            </div>

            {/* Exam Type Filter */}
            <div>
              <label htmlFor="examType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exam Type
              </label>
              <select
                  id="examType"
                  value={filters.examType}
                  onChange={(e) => handleFilterChange('examType', e.target.value)}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Types</option>
                <option value="ICT 1">ICT 1</option>
                <option value="ICT 2">ICT 2</option>
                <option value="Written Exam">Written Exam</option>
                <option value="Mock Test">Mock Test</option>
              </select>
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
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
                <option value="Foundation">Foundation</option>
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
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
            Showing {filteredExams.length} of {exams.length} exams
          </div>
        </div>

        <div className="p-6 container mx-auto">
          {filteredExams.length === 0 && !loading ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No exams found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  You haven't scheduled any exams yet. Click the button below to create your first exam.
                </p>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Schedule Exam
                </button>
              </div>
          ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredExams.map((exam) => (
                    <motion.div
                        key={exam._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      <div className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-4 flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center flex-wrap gap-2">
                            {exam.moduleCode}
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getExamTypeColor(exam.examType)}`}>
                        {exam.examType}
                      </span>
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getLevelColor(exam.level)}`}>
                        {exam.level}
                      </span>
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {exam.moduleName}
                          </p>
                        </div>
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                      </div>

                      <div className="p-5">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center mb-3">
                              <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(exam.date)}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{exam.startTime} - {exam.endTime}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center mb-3">
                              <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Module Leader</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{exam.moduleLeader}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Venue</p>
                                <a
                                    href={exam.venueLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  View Location
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {exam.description && (
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{exam.description}</p>
                            </div>
                        )}

                        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end space-x-2">
                          <button
                              onClick={() => setSelectedExam(exam)}
                              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                              onClick={() => handleDelete(exam._id, exam.moduleName)}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        <Modal
            isOpen={showCreateModal || !!selectedExam}
            onClose={() => {
              setShowCreateModal(false)
              setSelectedExam(null)
            }}
            title={selectedExam ? 'Edit Exam' : 'Schedule Exam'}
        >
          <div className="max-w-4xl w-full mx-auto">
            <ExamForm
                exam={selectedExam}
                onSubmit={(data) => {
                  if (selectedExam) {
                    handleUpdateExam(data)
                  } else {
                    handleCreateExam(data)
                  }
                }}
                onCancel={() => {
                  setShowCreateModal(false)
                  setSelectedExam(null)
                }}
            />
          </div>
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
                Delete Exam
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete <span className="font-semibold">{examToDelete?.name}</span>? This action cannot be undone.
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
                  disabled={loading || deleteConfirmation.toLowerCase() !== 'delete'}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                    <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Deleting...
                </span>
                ) : (
                    'Delete Exam'
                )}
              </button>
            </div>
          </div>
        </Modal>
      </BaseList>
  )
}

interface ExamFormProps {
  exam?: Exam | null
  onSubmit: (data: Partial<Exam>) => void
  onCancel: () => void
}

function ExamForm({ exam, onSubmit, onCancel }: ExamFormProps) {
  const [formData, setFormData] = useState({
    moduleCode: exam?.moduleCode || '',
    moduleName: exam?.moduleName || '',
    examType: exam?.examType || 'ICT 1',
    level: exam?.level || 'Level 4',
    date: exam?.date || '',
    startTime: exam?.startTime || '',
    endTime: exam?.endTime || '',
    description: exam?.description || '',
    moduleLeader: exam?.moduleLeader || '',
    venueLink: exam?.venueLink || '',
    status: exam?.status || 'scheduled'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Module Code <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={formData.moduleCode}
                onChange={(e) => setFormData({ ...formData, moduleCode: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
                placeholder="e.g. CS101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Module Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={formData.moduleName}
                onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
                placeholder="e.g. Introduction to Computer Science"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Exam Type <span className="text-red-500">*</span>
            </label>
            <select
                value={formData.examType}
                onChange={(e) => setFormData({ ...formData, examType: e.target.value as Exam['examType'] })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
            >
              <option value="ICT 1">ICT 1</option>
              <option value="ICT 2">ICT 2</option>
              <option value="Written Exam">Written Exam</option>
              <option value="Mock Test">Mock Test</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Level <span className="text-red-500">*</span>
            </label>
            <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as Exam['level'] })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
            >
              <option value="Level 4">Level 4</option>
              <option value="Level 5">Level 5</option>
              <option value="Level 6">Level 6</option>
              <option value="Level 7">Level 7</option>
              <option value="Foundation">Foundation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Module Leader <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={formData.moduleLeader}
                onChange={(e) => setFormData({ ...formData, moduleLeader: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
                placeholder="e.g. Dr. John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Venue Link <span className="text-red-500">*</span>
            </label>
            <input
                type="url"
                value={formData.venueLink}
                onChange={(e) => setFormData({ ...formData, venueLink: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                required
                placeholder="e.g. https://forms.example.com/venue-details"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              rows={3}
              placeholder="Enter any additional details about the exam"
          />
        </div>

        {exam && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Exam['status'] })}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
          >
            {exam ? 'Update Exam' : 'Schedule Exam'}
          </button>
        </div>
      </form>
  )
}