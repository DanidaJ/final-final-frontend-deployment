import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'

interface Event {
  _id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  organizer: string
  type: 'academic' | 'sports' | 'cultural' | 'holiday' | 'other'
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  participants?: string[]
}

// Add new interface for filters
interface Filters {
  type: string;
  status: string;
  searchQuery: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState('')

  // Add filter states
  const [filters, setFilters] = useState<Filters>({
    type: '',
    status: '',
    searchQuery: ''
  })

  const [formData, setFormData] = useState<Omit<Event, '_id'>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    type: 'academic',
    status: 'upcoming',
    participants: []
  })

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/events')
      setEvents(response.data)
    } catch (err) {
      setError('Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Add useEffect for filtering events
  useEffect(() => {
    let result = [...events]

    // Apply type filter
    if (filters.type) {
      result = result.filter(event => event.type === filters.type)
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(event => event.status === filters.status)
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      )
    }

    setFilteredEvents(result)
  }, [events, filters])

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
      status: '',
      searchQuery: ''
    })
  }

  const handleDelete = async (id: string) => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm')
      return
    }

    try {
      setIsLoading(true)
      await axios.delete(`/api/events/${id}`)
      setEvents(events.filter(event => event._id !== id))
      setIsDeleteModalOpen(false)
      setEventToDelete(null)
      setDeleteConfirmation('')
      setDeleteError('')
    } catch (err) {
      setError('Failed to delete event')
      console.error('Error deleting event:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event)
    setIsDeleteModalOpen(true)
    setDeleteConfirmation('')
    setDeleteError('')
  }

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
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

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'academic':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'sports':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'cultural':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'holiday':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'other':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return ''
    }
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.title.trim()) {
      errors.push('Event title is required')
    }
    if (!formData.description.trim()) {
      errors.push('Event description is required')
    }
    if (!formData.startDate) {
      errors.push('Start date is required')
    }
    if (!formData.endDate) {
      errors.push('End date is required')
    }
    if (!formData.location.trim()) {
      errors.push('Location is required')
    }
    if (!formData.organizer.trim()) {
      errors.push('Organizer is required')
    }

    // Validate dates
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (end < start) {
        errors.push('End date cannot be before start date')
      }
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Format dates to ISO string format
      const formattedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        type: formData.type as Event['type'],
        status: formData.status as Event['status'],
        participants: formData.participants || []
      }

      if (selectedEvent && selectedEvent._id) {
        // Update existing event with proper error handling
        try {
          const response = await axios.put(`/api/events/${selectedEvent._id}`, formattedData)

          // Update local state only if API call succeeds
          if (response.data) {
            setEvents(prevEvents => 
              prevEvents.map(event => 
                event._id === selectedEvent._id ? response.data : event
              )
            )
            setShowCreateModal(false)
            setSelectedEvent(null)
            setFormData({
              title: '',
              description: '',
              startDate: '',
              endDate: '',
              location: '',
              organizer: '',
              type: 'academic',
              status: 'upcoming',
              participants: []
            })
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Update error details:', error.response?.data)
            throw new Error(error.response?.data?.message || 'Failed to update event')
          }
          throw error
        }
      } else {
        // Create new event
        const response = await axios.post('/api/events', formattedData)
        
        if (response.data) {
          await fetchEvents()
          setShowCreateModal(false)
          setFormData({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            location: '',
            organizer: '',
            type: 'academic',
            status: 'upcoming',
            participants: []
          })
        }
      }
    } catch (err) {
      console.error('Full error object:', err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message
        setError(`Failed to ${selectedEvent ? 'update' : 'create'} event: ${errorMessage}`)
        console.error('API Error details:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        })
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = (event: Event) => {
    if (!event._id) {
      setError('Cannot edit event: Invalid event ID')
      return
    }
    
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      location: event.location,
      organizer: event.organizer,
      type: event.type,
      status: event.status,
      participants: event.participants || []
    })
    setShowCreateModal(true)
  }

  return (
    <>
      <BaseList
        title="Events"
        createButtonLabel="Create Event"
        onCreateClick={() => setShowCreateModal(true)}
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
                placeholder="Search by title, description, organizer, or location"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
            </div>

            {/* Event Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Types</option>
                <option value="academic">Academic</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="holiday">Holiday</option>
                <option value="other">Other</option>
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
                <option value="upcoming">Upcoming</option>
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
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
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
              {filteredEvents.map((event) => (
                <motion.tr
                  key={event._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.organizer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        to {new Date(event.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(event)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(event)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedEvent(null)
          setFormData({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            location: '',
            organizer: '',
            type: 'academic',
            status: 'upcoming',
            participants: []
          })
          setError(null)
        }}
        title={selectedEvent ? 'Edit Event' : 'Create Event'}
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
              {selectedEvent ? "Update event information" : "Enter event details"}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please fill in all the required fields marked with an asterisk (*).
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Organizer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  required
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="holiday">Holiday</option>
                  <option value="other">Other</option>
                </select>
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Event['status'] })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  min={formData.startDate}
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
            <button
              type="button"
              onClick={() => {
                setShowCreateModal(false)
                setSelectedEvent(null)
                setFormData({
                  title: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                  location: '',
                  organizer: '',
                  type: 'academic',
                  status: 'upcoming',
                  participants: []
                })
                setError(null)
              }}
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
                  {selectedEvent ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                selectedEvent ? 'Update Event' : 'Create Event'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setEventToDelete(null)
          setDeleteConfirmation('')
          setDeleteError('')
        }}
        title="Delete Event"
      >
        <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
          <div className="relative pb-3">
            <div className="absolute top-0 left-0 w-16 h-1 bg-red-600 dark:bg-red-500 rounded-full"></div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
              Confirm Event Deletion
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
                      You are about to delete the following event:
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p className="font-medium">{eventToDelete?.title}</p>
                      <p className="mt-1">Type: {eventToDelete?.type}</p>
                      <p className="mt-1">Date: {eventToDelete?.startDate && new Date(eventToDelete.startDate).toLocaleDateString()}</p>
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
                setEventToDelete(null)
                setDeleteConfirmation('')
                setDeleteError('')
              }}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => eventToDelete && handleDelete(eventToDelete._id)}
              disabled={deleteConfirmation.toLowerCase() !== 'delete'}
              className="px-5 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Event
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
} 