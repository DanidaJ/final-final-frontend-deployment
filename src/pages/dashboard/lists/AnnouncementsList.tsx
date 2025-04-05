import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import axios from '../../../config/axios'

type TargetAudience = 'all' | 'lecturers' | 'students' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7'

interface Announcement {
  _id: string
  title: string
  content: string
  author: string
  publishDate: string
  expiryDate?: string
  type: 'general' | 'academic' | 'administrative' | 'emergency'
  priority: 'low' | 'medium' | 'high'
  status: 'draft' | 'published' | 'archived'
  targetAudience: TargetAudience[]
}

// Add new interface for filters
interface Filters {
  type: string;
  priority: string;
  status: string;
  targetAudience: string;
  searchQuery: string;
}

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add filter states
  const [filters, setFilters] = useState<Filters>({
    type: '',
    priority: '',
    status: '',
    targetAudience: '',
    searchQuery: ''
  })

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.get('/api/announcements')
      setAnnouncements(response.data)
    } catch (err) {
      console.error('Error fetching announcements:', err)
      setError('Failed to load announcements')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // Add useEffect for filtering announcements
  useEffect(() => {
    let result = [...announcements]

    // Apply type filter
    if (filters.type) {
      result = result.filter(announcement => announcement.type === filters.type)
    }

    // Apply priority filter
    if (filters.priority) {
      result = result.filter(announcement => announcement.priority === filters.priority)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(announcement => announcement.status === filters.status)
    }

    // Apply target audience filter
    if (filters.targetAudience) {
      result = result.filter(announcement => 
        announcement.targetAudience.includes(filters.targetAudience as TargetAudience)
      )
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(announcement =>
        announcement.title.toLowerCase().includes(query) ||
        announcement.content.toLowerCase().includes(query) ||
        announcement.author.toLowerCase().includes(query)
      )
    }

    setFilteredAnnouncements(result)
  }, [announcements, filters])

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
      type: '',
      priority: '',
      status: '',
      targetAudience: '',
      searchQuery: ''
    })
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await axios.delete(`/api/announcements/${id}`)
      await fetchAnnouncements()
    } catch (err) {
      console.error('Error deleting announcement:', err)
      setError('Failed to delete announcement')
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return ''
    }
  }

  const getTypeColor = (type: Announcement['type']) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'administrative':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'general':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return ''
    }
  }

  const getStatusColor = (status: Announcement['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'archived':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return ''
    }
  }

  return (
    <>
      <BaseList
        title="Announcements"
        createButtonLabel="Create Announcement"
        onCreateClick={() => setShowCreateModal(true)}
      >
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Filter Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search by title, content, or author"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Types</option>
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="administrative">Administrative</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Target Audience Filter */}
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Audience
              </label>
              <select
                id="targetAudience"
                value={filters.targetAudience}
                onChange={(e) => handleFilterChange('targetAudience', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Audiences</option>
                <option value="all">All</option>
                <option value="lecturers">Lecturers</option>
                <option value="students">Students</option>
                <option value="l3">Level 3</option>
                <option value="l4">Level 4</option>
                <option value="l5">Level 5</option>
                <option value="l6">Level 6</option>
                <option value="l7">Level 7</option>
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
            Showing {filteredAnnouncements.length} of {announcements.length} announcements
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Announcement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type/Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Target Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No announcements found
                  </td>
                </tr>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <motion.tr
                    key={announcement._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {announcement.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        By {announcement.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {announcement.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mb-2 ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                      </span>
                      <br />
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {announcement.targetAudience.map((audience) => (
                          <span
                            key={audience}
                            className={`
                              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                              ${audience === 'all' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : audience.startsWith('l') 
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }
                            `}
                          >
                            {audience === 'l3' ? 'Level 3' :
                             audience === 'l4' ? 'Level 4' :
                             audience === 'l5' ? 'Level 5' :
                             audience === 'l6' ? 'Level 6' :
                             audience === 'l7' ? 'Level 7' :
                             audience.charAt(0).toUpperCase() + audience.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(announcement.publishDate).toLocaleDateString()}
                      </div>
                      {announcement.expiryDate && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(announcement.status)}`}>
                        {announcement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedAnnouncement(announcement)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(announcement._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </BaseList>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || !!selectedAnnouncement}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedAnnouncement(null)
        }}
        title={selectedAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
        width="wide"
      >
        <AnnouncementForm
          announcement={selectedAnnouncement}
          onSubmit={async (data) => {
            try {
              setIsLoading(true)
              setError(null)
              
              if (selectedAnnouncement) {
                await axios.put(`/api/announcements/${selectedAnnouncement._id}`, data)
              } else {
                await axios.post('/api/announcements', data)
              }
              
              await fetchAnnouncements()
              setShowCreateModal(false)
              setSelectedAnnouncement(null)
            } catch (err) {
              console.error('Error saving announcement:', err)
              setError('Failed to save announcement')
            } finally {
              setIsLoading(false)
            }
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setSelectedAnnouncement(null)
          }}
          isLoading={isLoading}
        />
      </Modal>
    </>
  )
}

interface AnnouncementFormProps {
  announcement?: Announcement | null
  onSubmit: (data: Partial<Announcement>) => void
  onCancel: () => void
  isLoading?: boolean
}

function AnnouncementForm({ announcement, onSubmit, onCancel, isLoading }: AnnouncementFormProps) {
  const targetAudienceOptions: TargetAudience[] = ['all', 'lecturers', 'students', 'l3', 'l4', 'l5', 'l6', 'l7']

  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    content: announcement?.content || '',
    author: announcement?.author || '',
    publishDate: announcement?.publishDate || new Date().toISOString().split('T')[0],
    expiryDate: announcement?.expiryDate || '',
    type: announcement?.type || 'general',
    priority: announcement?.priority || 'low',
    status: announcement?.status || 'draft',
    targetAudience: announcement?.targetAudience || ['all']
  })
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.title.trim()) {
      errors.push('Title is required')
    }
    if (!formData.content.trim()) {
      errors.push('Content is required')
    }
    if (!formData.author.trim()) {
      errors.push('Author is required')
    }
    if (!formData.publishDate) {
      errors.push('Publish date is required')
    }
    if (!formData.targetAudience || formData.targetAudience.length === 0) {
      errors.push('Target audience is required')
    }
    if (formData.expiryDate && formData.expiryDate <= formData.publishDate) {
      errors.push('Expiry date must be after publish date')
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }
    setError(null)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto w-full">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative pb-3">
        <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
          {announcement ? "Update announcement information" : "Enter announcement details"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Please fill in all the required fields marked with an asterisk (*).
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Announcement['type'] })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            >
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="administrative">Administrative</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Announcement['priority'] })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              min={formData.publishDate}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Announcement['status'] })}
              className="block w-full h-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {targetAudienceOptions.map((audience) => (
                <label
                  key={audience}
                  className={`
                    flex items-center p-2 rounded-md border cursor-pointer transition-colors
                    ${formData.targetAudience.includes(audience)
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400'
                      : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={formData.targetAudience.includes(audience)}
                    onChange={(e) => {
                      if (audience === 'all') {
                        setFormData({
                          ...formData,
                          targetAudience: e.target.checked ? ['all'] : []
                        })
                      } else {
                        const newAudience = e.target.checked
                          ? [...formData.targetAudience.filter(a => a !== 'all'), audience]
                          : formData.targetAudience.filter(a => a !== audience)
                        setFormData({
                          ...formData,
                          targetAudience: newAudience as TargetAudience[]
                        })
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    disabled={isLoading || (audience !== 'all' && formData.targetAudience.includes('all'))}
                  />
                  <span className="ml-2 text-sm capitalize">
                    {audience === 'l3' ? 'Level 3' :
                     audience === 'l4' ? 'Level 4' :
                     audience === 'l5' ? 'Level 5' :
                     audience === 'l6' ? 'Level 6' :
                     audience === 'l7' ? 'Level 7' :
                     audience}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2 col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={5}
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 w-full px-6">
        <button
          type="button"
          onClick={onCancel}
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
              {announcement ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            announcement ? 'Update' : 'Create'
          )}
        </button>
      </div>
    </form>
  )
} 