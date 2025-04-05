import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface Assignment {
  _id: string
  moduleCode: string
  moduleName: string
  title: string
  description: string
  dueDate: string
  dueTime: string
  totalMarks: number
  weightPercentage: number
  submissionType: 'document' | 'presentation' | 'code' | 'other'
  moduleLeader: string
  submissionLink: string
  level: string
  status: 'pending' | 'submitted' | 'graded' | 'late'
  createdAt: string
  updatedAt: string
}

// Add new interface for filters
interface Filters {
  submissionType: string;
  level: string;
  status: string;
  searchQuery: string;
}

export default function AssignmentsList() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [filters, setFilters] = useState<Filters>({
    submissionType: '',
    level: '',
    status: '',
    searchQuery: ''
  })

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      setIsLoading(true)
      const data = await api.getAssignments()
      setAssignments(data)
    } catch (error) {
      console.error('Error fetching assignments:', error)
      toast.error('Failed to load assignments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowCreateModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAssignment) return

    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    try {
      await api.deleteAssignment(selectedAssignment._id)
      setAssignments(assignments.filter(a => a._id !== selectedAssignment._id))
      toast.success('Assignment deleted successfully')
      setIsDeleteModalOpen(false)
      setAssignmentToDelete(null)
      setDeleteConfirmation('')
      setDeleteError('')
    } catch (error) {
      console.error('Error deleting assignment:', error)
      toast.error('Failed to delete assignment')
    }
  }

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
      case 'submitted':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200 border border-sky-200 dark:border-sky-800'
      case 'graded':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
      case 'late':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-200 border border-gray-200 dark:border-gray-800'
    }
  }

  const getSubmissionTypeColor = (type: Assignment['submissionType']) => {
    switch (type) {
      case 'document':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200 border border-violet-200 dark:border-violet-800'
      case 'presentation':
        return 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-200 border border-fuchsia-200 dark:border-fuchsia-800'
      case 'code':
        return 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800'
      case 'other':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200 border border-orange-200 dark:border-orange-800'
      default:
        return ''
    }
  }

  const handleSubmit = async (data: Partial<Assignment>) => {
    try {
      if (selectedAssignment) {
        await api.updateAssignment(selectedAssignment._id, data)
        const updatedAssignments = assignments.map(a =>
            a._id === selectedAssignment._id ? { ...a, ...data } : a
        )
        setAssignments(updatedAssignments)
        toast.success('Assignment updated successfully')
      } else {
        const newAssignment = await api.createAssignment(data)
        setAssignments([...assignments, newAssignment])
        toast.success('Assignment created successfully')
      }
      setShowCreateModal(false)
      setSelectedAssignment(null)
    } catch (error) {
      console.error('Error saving assignment:', error)
      toast.error('Failed to save assignment')
    }
  }

  // Add useEffect for filtering assignments
  useEffect(() => {
    let result = [...assignments]

    // Apply submission type filter
    if (filters.submissionType) {
      result = result.filter(assignment => assignment.submissionType === filters.submissionType)
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter(assignment => assignment.level === filters.level)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(assignment => assignment.status === filters.status)
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(assignment =>
          assignment.title.toLowerCase().includes(query) ||
          assignment.moduleCode.toLowerCase().includes(query) ||
          assignment.moduleName.toLowerCase().includes(query) ||
          assignment.moduleLeader.toLowerCase().includes(query)
      )
    }

    setFilteredAssignments(result)
  }, [assignments, filters])

  // Update reset filters function
  const resetFilters = () => {
    setFilters({
      submissionType: '',
      level: '',
      status: '',
      searchQuery: ''
    })
  }

  // Add handler for filter changes
  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
      <>
        <BaseList
            title="Assignments"
            createButtonLabel="Create Assignment"
            onCreateClick={() => setShowCreateModal(true)}
            isLoading={isLoading}
        >
          {/* Add Filter Section */}
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    placeholder="Search by title, module, or leader"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                />
              </div>

              {/* Submission Type Filter */}
              <div>
                <label htmlFor="submissionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Submission Type
                </label>
                <select
                    id="submissionType"
                    value={filters.submissionType}
                    onChange={(e) => handleFilterChange('submissionType', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Types</option>
                  <option value="document">Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="code">Code</option>
                  <option value="other">Other</option>
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
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="graded">Graded</option>
                  <option value="late">Late</option>
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
              Showing {filteredAssignments.length} of {assignments.length} assignments
            </div>
          </div>

          {assignments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-full mb-4">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No assignments found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">Get started by creating a new assignment.</p>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 shadow-sm transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Assignment
                </button>
              </div>
          ) : (
              <div className="space-y-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 mr-4">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assignments</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{assignments.length}</p>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center">
                    <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 mr-4">
                      <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {assignments.filter(a => a.status === 'pending').length}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center">
                    <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 mr-4">
                      <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Graded</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {assignments.filter(a => a.status === 'graded').length}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center">
                    <div className="rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-4 mr-4">
                      <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Late</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {assignments.filter(a => a.status === 'late').length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Pending Column */}
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-t-xl">
                      <h3 className="font-medium text-amber-800 dark:text-amber-200 flex items-center">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Pending
                      </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                      {filteredAssignments.filter(a => a.status === 'pending').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No pending assignments</p>
                          </div>
                      ) : (
                          filteredAssignments
                              .filter(a => a.status === 'pending')
                              .map(assignment => (
                                  <motion.div
                                      key={assignment._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-600/30 hover:shadow-md transition-all duration-200 group backdrop-blur-sm relative"
                                  >
                                    {/* Header Section with Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                          {assignment.title}
                                        </h4>
                                        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                          {assignment.moduleCode} - {assignment.moduleName}
                                        </p>
                                      </div>
                                      <div className="flex items-start space-x-3">
                                        <div className="flex space-x-1">
                                          <button
                                              onClick={() => setSelectedAssignment(assignment)}
                                              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                                              title="Edit"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                          </button>
                                          <button
                                              onClick={() => handleDeleteClick(assignment)}
                                              className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/50 transition-colors"
                                              title="Delete"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                                      </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                      {/* Left Column */}
                                      <div className="space-y-2">
                                        {/* Module Leader */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                          <span className="truncate">{assignment.moduleLeader}</span>
                                        </div>

                                        {/* Level */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                          </svg>
                                          <span>{assignment.level}</span>
                                        </div>
                                      </div>

                                      {/* Right Column */}
                                      <div className="space-y-2">
                                        {/* Due Date */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                        </div>

                                        {/* Due Time */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span>{assignment.dueTime}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-600/30">
                                      <div className="flex items-center space-x-3">
                                        {/* Submission Type */}
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${getSubmissionTypeColor(assignment.submissionType)}`}>
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {assignment.submissionType === 'document' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  )}
                                  {assignment.submissionType === 'presentation' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                  )}
                                  {assignment.submissionType === 'code' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  )}
                                  {assignment.submissionType === 'other' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                  )}
                                </svg>
                                          {assignment.submissionType.charAt(0).toUpperCase() + assignment.submissionType.slice(1)}
                              </span>

                                        {/* Marks */}
                                        <div className="flex items-center text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  {assignment.totalMarks} marks ({assignment.weightPercentage}%)
                                </span>
                                        </div>
                                      </div>

                                      {/* Submission Link if available */}
                                      {assignment.submissionLink && (
                                          <a
                                              href={assignment.submissionLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                          >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Submission
                                          </a>
                                      )}
                                    </div>
                                  </motion.div>
                              ))
                      )}
                    </div>
                  </div>

                  {/* Submitted Column */}
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-t-xl">
                      <h3 className="font-medium text-sky-800 dark:text-sky-200 flex items-center">
                        <span className="w-2 h-2 bg-sky-400 rounded-full mr-2"></span>
                        Submitted
                      </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                      {filteredAssignments.filter(a => a.status === 'submitted').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No submitted assignments</p>
                          </div>
                      ) : (
                          filteredAssignments
                              .filter(a => a.status === 'submitted')
                              .map(assignment => (
                                  <motion.div
                                      key={assignment._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-600/30 hover:shadow-md transition-all duration-200 group backdrop-blur-sm relative"
                                  >
                                    {/* Header Section with Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                          {assignment.title}
                                        </h4>
                                        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                          {assignment.moduleCode} - {assignment.moduleName}
                                        </p>
                                      </div>
                                      <div className="flex items-start space-x-3">
                                        <div className="flex space-x-1">
                                          <button
                                              onClick={() => setSelectedAssignment(assignment)}
                                              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                                              title="Edit"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                          </button>
                                          <button
                                              onClick={() => handleDeleteClick(assignment)}
                                              className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/50 transition-colors"
                                              title="Delete"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                                      </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                      {/* Left Column */}
                                      <div className="space-y-2">
                                        {/* Module Leader */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                          <span className="truncate">{assignment.moduleLeader}</span>
                                        </div>

                                        {/* Level */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                          </svg>
                                          <span>{assignment.level}</span>
                                        </div>
                                      </div>

                                      {/* Right Column */}
                                      <div className="space-y-2">
                                        {/* Due Date */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                        </div>

                                        {/* Due Time */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span>{assignment.dueTime}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-600/30">
                                      <div className="flex items-center space-x-3">
                                        {/* Submission Type */}
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${getSubmissionTypeColor(assignment.submissionType)}`}>
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {assignment.submissionType === 'document' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  )}
                                  {assignment.submissionType === 'presentation' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                  )}
                                  {assignment.submissionType === 'code' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  )}
                                  {assignment.submissionType === 'other' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                  )}
                                </svg>
                                          {assignment.submissionType.charAt(0).toUpperCase() + assignment.submissionType.slice(1)}
                              </span>

                                        {/* Marks */}
                                        <div className="flex items-center text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  {assignment.totalMarks} marks ({assignment.weightPercentage}%)
                                </span>
                                        </div>
                                      </div>

                                      {/* Submission Link if available */}
                                      {assignment.submissionLink && (
                                          <a
                                              href={assignment.submissionLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                          >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Submission
                                          </a>
                                      )}
                                    </div>
                                  </motion.div>
                              ))
                      )}
                    </div>
                  </div>

                  {/* Graded Column */}
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-t-xl">
                      <h3 className="font-medium text-emerald-800 dark:text-emerald-200 flex items-center">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                        Graded
                      </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                      {filteredAssignments.filter(a => a.status === 'graded').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No graded assignments</p>
                          </div>
                      ) : (
                          filteredAssignments
                              .filter(a => a.status === 'graded')
                              .map(assignment => (
                                  <motion.div
                                      key={assignment._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-600/30 hover:shadow-md transition-all duration-200 group backdrop-blur-sm relative"
                                  >
                                    {/* Header Section with Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                          {assignment.title}
                                        </h4>
                                        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                          {assignment.moduleCode} - {assignment.moduleName}
                                        </p>
                                      </div>
                                      <div className="flex items-start space-x-3">
                                        <div className="flex space-x-1">
                                          <button
                                              onClick={() => setSelectedAssignment(assignment)}
                                              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                                              title="Edit"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                          </button>
                                          <button
                                              onClick={() => handleDeleteClick(assignment)}
                                              className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/50 transition-colors"
                                              title="Delete"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                                      </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                      {/* Left Column */}
                                      <div className="space-y-2">
                                        {/* Module Leader */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                          <span className="truncate">{assignment.moduleLeader}</span>
                                        </div>

                                        {/* Level */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                          </svg>
                                          <span>{assignment.level}</span>
                                        </div>
                                      </div>

                                      {/* Right Column */}
                                      <div className="space-y-2">
                                        {/* Due Date */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                        </div>

                                        {/* Due Time */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span>{assignment.dueTime}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-600/30">
                                      <div className="flex items-center space-x-3">
                                        {/* Submission Type */}
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${getSubmissionTypeColor(assignment.submissionType)}`}>
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {assignment.submissionType === 'document' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  )}
                                  {assignment.submissionType === 'presentation' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                  )}
                                  {assignment.submissionType === 'code' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  )}
                                  {assignment.submissionType === 'other' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                  )}
                                </svg>
                                          {assignment.submissionType.charAt(0).toUpperCase() + assignment.submissionType.slice(1)}
                              </span>

                                        {/* Marks */}
                                        <div className="flex items-center text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  {assignment.totalMarks} marks ({assignment.weightPercentage}%)
                                </span>
                                        </div>
                                      </div>

                                      {/* Submission Link if available */}
                                      {assignment.submissionLink && (
                                          <a
                                              href={assignment.submissionLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                          >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Submission
                                          </a>
                                      )}
                                    </div>
                                  </motion.div>
                              ))
                      )}
                    </div>
                  </div>

                  {/* Late Column */}
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-t-xl">
                      <h3 className="font-medium text-rose-800 dark:text-rose-200 flex items-center">
                        <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                        Late
                      </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                      {filteredAssignments.filter(a => a.status === 'late').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No late assignments</p>
                          </div>
                      ) : (
                          filteredAssignments
                              .filter(a => a.status === 'late')
                              .map(assignment => (
                                  <motion.div
                                      key={assignment._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="bg-white dark:bg-gray-700/50 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-600/30 hover:shadow-md transition-all duration-200 group backdrop-blur-sm relative"
                                  >
                                    {/* Header Section with Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                          {assignment.title}
                                        </h4>
                                        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                          {assignment.moduleCode} - {assignment.moduleName}
                                        </p>
                                      </div>
                                      <div className="flex items-start space-x-3">
                                        <div className="flex space-x-1">
                                          <button
                                              onClick={() => setSelectedAssignment(assignment)}
                                              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                                              title="Edit"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                          </button>
                                          <button
                                              onClick={() => handleDeleteClick(assignment)}
                                              className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/50 transition-colors"
                                              title="Delete"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                                      </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                      {/* Left Column */}
                                      <div className="space-y-2">
                                        {/* Module Leader */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                          <span className="truncate">{assignment.moduleLeader}</span>
                                        </div>

                                        {/* Level */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                          </svg>
                                          <span>{assignment.level}</span>
                                        </div>
                                      </div>

                                      {/* Right Column */}
                                      <div className="space-y-2">
                                        {/* Due Date */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                        </div>

                                        {/* Due Time */}
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span>{assignment.dueTime}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-600/30">
                                      <div className="flex items-center space-x-3">
                                        {/* Submission Type */}
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${getSubmissionTypeColor(assignment.submissionType)}`}>
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {assignment.submissionType === 'document' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  )}
                                  {assignment.submissionType === 'presentation' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                  )}
                                  {assignment.submissionType === 'code' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  )}
                                  {assignment.submissionType === 'other' && (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                  )}
                                </svg>
                                          {assignment.submissionType.charAt(0).toUpperCase() + assignment.submissionType.slice(1)}
                              </span>

                                        {/* Marks */}
                                        <div className="flex items-center text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  {assignment.totalMarks} marks ({assignment.weightPercentage}%)
                                </span>
                                        </div>
                                      </div>

                                      {/* Submission Link if available */}
                                      {assignment.submissionLink && (
                                          <a
                                              href={assignment.submissionLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                          >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Submission
                                          </a>
                                      )}
                                    </div>
                                  </motion.div>
                              ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )}
        </BaseList>

        {/* Create/Edit Modal */}
        <Modal
            isOpen={showCreateModal || !!selectedAssignment}
            onClose={() => {
              setShowCreateModal(false)
              setSelectedAssignment(null)
            }}
            title={selectedAssignment ? 'Edit Assignment' : 'Create Assignment'}
        >
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="p-5">
                  <AssignmentForm
                      assignment={selectedAssignment}
                      onSubmit={handleSubmit}
                      onCancel={() => {
                        setShowCreateModal(false)
                        setSelectedAssignment(null)
                      }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setAssignmentToDelete(null)
              setDeleteConfirmation('')
              setDeleteError('')
            }}
            title="Delete Assignment"
        >
          <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
            <div className="relative pb-3">
              <div className="absolute top-0 left-0 w-16 h-1 bg-red-600 dark:bg-red-500 rounded-full"></div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                Confirm Assignment Deletion
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This action cannot be undone. Please confirm by typing "delete" below.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-100 dark:border-red-800">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        You are about to delete the following assignment:
                      </h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <p className="font-medium">{assignmentToDelete?.title}</p>
                        <p className="mt-1">Module: {assignmentToDelete?.moduleCode} - {assignmentToDelete?.moduleName}</p>
                        <p className="mt-1">Due: {assignmentToDelete?.dueDate && typeof assignmentToDelete.dueDate === 'string' ? new Date(assignmentToDelete.dueDate).toLocaleDateString() : ''} at {assignmentToDelete?.dueTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="delete-confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type "delete" to confirm <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="delete-confirmation"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder='Type "delete" to confirm'
                  />
                  {deleteError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{deleteError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
              <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setAssignmentToDelete(null)
                    setDeleteConfirmation('')
                    setDeleteError('')
                  }}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleteConfirmation.toLowerCase() !== 'delete'}
                  className="px-5 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Assignment
              </button>
            </div>
          </div>
        </Modal>
      </>
  )
}

interface AssignmentFormProps {
  assignment?: Assignment | null
  onSubmit: (data: Partial<Assignment>) => void
  onCancel: () => void
}

function AssignmentForm({ assignment, onSubmit, onCancel }: AssignmentFormProps) {
  const [formData, setFormData] = useState({
    moduleCode: assignment?.moduleCode || '',
    moduleName: assignment?.moduleName || '',
    title: assignment?.title || '',
    description: assignment?.description || '',
    dueDate: assignment?.dueDate || '',
    dueTime: assignment?.dueTime || '',
    totalMarks: assignment?.totalMarks || 100,
    weightPercentage: assignment?.weightPercentage || 0,
    submissionType: assignment?.submissionType || 'document',
    moduleLeader: assignment?.moduleLeader || '',
    submissionLink: assignment?.submissionLink || '',
    level: assignment?.level || 'Level 4',
    status: assignment?.status || 'pending'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
        <div className="relative pb-3">
          <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
            {assignment ? "Update assignment information" : "Enter assignment details"}
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
              <label htmlFor="moduleCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Module Code <span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  id="moduleCode"
                  value={formData.moduleCode}
                  onChange={(e) => setFormData({ ...formData, moduleCode: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
                  placeholder="e.g., CS101"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Module Name <span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  id="moduleName"
                  value={formData.moduleName}
                  onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
                  placeholder="e.g., Introduction to Computer Science"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignment Title <span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
                  placeholder="e.g., Final Project Report"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
                  placeholder="Provide a detailed description of the assignment..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="moduleLeader" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Module Leader <span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  id="moduleLeader"
                  value={formData.moduleLeader}
                  onChange={(e) => setFormData({ ...formData, moduleLeader: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
                  placeholder="e.g., Dr. John Smith"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Level <span className="text-red-500">*</span>
              </label>
              <select
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              >
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="relative pb-3 mb-4">
            <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
              Submission Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Time <span className="text-red-500">*</span>
              </label>
              <input
                  type="time"
                  id="dueTime"
                  value={formData.dueTime}
                  onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Marks <span className="text-red-500">*</span>
              </label>
              <input
                  type="number"
                  id="totalMarks"
                  min="0"
                  max="1000"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="weightPercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight Percentage <span className="text-red-500">*</span>
              </label>
              <input
                  type="number"
                  id="weightPercentage"
                  min="0"
                  max="100"
                  value={formData.weightPercentage}
                  onChange={(e) => setFormData({ ...formData, weightPercentage: parseInt(e.target.value) })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="submissionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Submission Type <span className="text-red-500">*</span>
              </label>
              <select
                  id="submissionType"
                  value={formData.submissionType}
                  onChange={(e) => setFormData({ ...formData, submissionType: e.target.value as Assignment['submissionType'] })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              >
                <option value="document">Document</option>
                <option value="presentation">Presentation</option>
                <option value="code">Code</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Assignment['status'] })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  required
              >
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
                <option value="late">Late</option>
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="submissionLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Submission Link
              </label>
              <input
                  type="url"
                  id="submissionLink"
                  value={formData.submissionLink}
                  onChange={(e) => setFormData({ ...formData, submissionLink: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
          <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assignment ? 'Update Assignment' : 'Create Assignment'}
          </button>
        </div>
      </form>
  )
}