import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'
import axios from '../../../config/axios'

interface RoomBooking {
  _id: string
  room_number: string
  purpose: string
  date: string
  start_time: string
  end_time: string
  booked_by: string
  email: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
}

interface Filters {
  status: string;
  room: string;
  dateRange: 'recent' | 'old' | 'all';
  searchQuery: string;
}

interface RoomBookingFormProps {
  booking?: RoomBooking
  onSubmit: (data: Partial<RoomBooking>) => void
  onCancel: () => void
  isLoading?: boolean
}

function RoomBookingForm({ booking, onSubmit, onCancel, isLoading }: RoomBookingFormProps) {
  const [formData, setFormData] = useState({
    room_number: booking?.room_number || '',
    purpose: booking?.purpose || '',
    date: booking?.date || new Date().toISOString().split('T')[0],
    start_time: booking?.start_time || '',
    end_time: booking?.end_time || '',
    booked_by: booking?.booked_by || '',
    email: booking?.email || '',
    status: booking?.status || 'pending'
  })
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.room_number.trim()) {
      errors.push('Room number is required')
    }
    if (!formData.purpose.trim()) {
      errors.push('Purpose is required')
    }
    if (!formData.date) {
      errors.push('Date is required')
    }
    if (!formData.start_time) {
      errors.push('Start time is required')
    }
    if (!formData.end_time) {
      errors.push('End time is required')
    }
    if (!formData.booked_by.trim()) {
      errors.push('Booked by is required')
    }
    if (!formData.email.trim()) {
      errors.push('Email is required')
    }
    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      errors.push('End time must be after start time')
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
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative pb-3">
        <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
          {booking ? "Update room booking information" : "Enter room booking details"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Please fill in all the required fields marked with an asterisk (*).
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Room Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.room_number}
              onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Booked By <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.booked_by}
              onChange={(e) => setFormData({ ...formData, booked_by: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              min={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Purpose <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as RoomBooking['status'] })}
              className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              required
              disabled={isLoading}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
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
              {booking ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            booking ? 'Update Booking' : 'Create Booking'
          )}
        </button>
      </div>
    </form>
  )
}

export default function RoomBookingsList() {
  const [bookings, setBookings] = useState<RoomBooking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<RoomBooking[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<RoomBooking | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<RoomBooking | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const [filters, setFilters] = useState<Filters>({
    status: '',
    room: '',
    dateRange: 'all',
    searchQuery: ''
  })

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.get('/api/room-bookings')
      setBookings(response.data)
    } catch (err) {
      console.error('Error fetching room bookings:', err)
      setError('Failed to load room bookings')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    let result = [...bookings]

    if (filters.status) {
      result = result.filter(booking => booking.status === filters.status)
    }

    if (filters.room) {
      result = result.filter(booking => booking.room_number.toLowerCase().includes(filters.room.toLowerCase()))
    }

    if (filters.dateRange !== 'all') {
      const today = new Date()
      result = result.filter(booking => {
        const bookingDate = new Date(booking.date)
        const diffTime = Math.abs(today.getTime() - bookingDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return filters.dateRange === 'recent' ? diffDays <= 7 : diffDays > 7
      })
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(booking =>
        booking.room_number.toLowerCase().includes(query) ||
        booking.purpose.toLowerCase().includes(query) ||
        booking.booked_by.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query)
      )
    }

    setFilteredBookings(result)
  }, [bookings, filters])

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: '',
      room: '',
      dateRange: 'all',
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
      await axios.delete(`/api/room-bookings/${id}`)
      setBookings(bookings.filter(booking => booking._id !== id))
      setIsDeleteModalOpen(false)
      setBookingToDelete(null)
      setDeleteConfirmation('')
      setDeleteError('')
    } catch (err) {
      setError('Failed to delete room booking')
      console.error('Error deleting room booking:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (booking: RoomBooking) => {
    setBookingToDelete(booking)
    setIsDeleteModalOpen(true)
    setDeleteConfirmation('')
    setDeleteError('')
  }

  const getStatusColor = (status: RoomBooking['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  return (
    <>
      <BaseList
        title="Room Bookings"
        createButtonLabel="Book Room"
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

        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search by room, purpose, or booked by"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              />
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Room
              </label>
              <select
                id="room"
                value={filters.room}
                onChange={(e) => handleFilterChange('room', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="">All Rooms</option>
                {[...new Set(bookings.map(booking => booking.room_number))].map(room => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Booking Date
              </label>
              <select
                id="dateRange"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
              >
                <option value="all">All Dates</option>
                <option value="recent">Recent (Last 7 days)</option>
                <option value="old">Older</option>
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
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Booked By
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
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No room bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.room_number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {booking.purpose}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.start_time} - {booking.end_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.booked_by}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(booking)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      <Modal
        isOpen={showCreateModal || !!selectedBooking}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedBooking(null)
        }}
        title={selectedBooking ? 'Edit Room Booking' : 'Book a Room'}
      >
        <RoomBookingForm
          booking={selectedBooking || undefined}
          onSubmit={async (data) => {
            try {
              setIsLoading(true)
              setError(null)
              
              if (selectedBooking) {
                await axios.put(`/api/room-bookings/${selectedBooking._id}`, data)
              } else {
                await axios.post('/api/room-bookings', data)
              }
              
              await fetchBookings()
              setShowCreateModal(false)
              setSelectedBooking(null)
            } catch (err) {
              console.error('Error saving room booking:', err)
              setError('Failed to save room booking')
            } finally {
              setIsLoading(false)
            }
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setSelectedBooking(null)
          }}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setBookingToDelete(null)
          setDeleteConfirmation('')
          setDeleteError('')
        }}
        title="Delete Room Booking"
      >
        <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
          <div className="relative pb-3">
            <div className="absolute top-0 left-0 w-16 h-1 bg-red-600 dark:bg-red-500 rounded-full"></div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
              Confirm Room Booking Deletion
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
                      You are about to delete the following room booking:
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p className="font-medium">Room: {bookingToDelete?.room_number}</p>
                      <p className="mt-1">Purpose: {bookingToDelete?.purpose}</p>
                      <p className="mt-1">Date: {bookingToDelete?.date}</p>
                      <p className="mt-1">Time: {bookingToDelete?.start_time} - {bookingToDelete?.end_time}</p>
                      <p className="mt-1">Booked by: {bookingToDelete?.booked_by}</p>
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
                setBookingToDelete(null)
                setDeleteConfirmation('')
                setDeleteError('')
              }}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => bookingToDelete && handleDelete(bookingToDelete._id)}
              disabled={deleteConfirmation.toLowerCase() !== 'delete'}
              className="px-5 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Booking
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
} 