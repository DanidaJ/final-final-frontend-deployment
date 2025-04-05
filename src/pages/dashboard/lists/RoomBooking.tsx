import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import { BaseListProps } from '../../../types/common'

interface Room {
    id: number
    name: string
    purpose: string
    booked: string
    capacity: number
    status: 'booked' | 'occupied' | 'free'
    bookingDate?: string // Add booking date field
}

// Add filter interface
interface Filters {
    status: string;
    room: string;
    dateRange: 'recent' | 'old' | 'all';
    searchQuery: string;
}

const mockRooms: Room[] = [
    {
        id: 1,
        name: '6LA',
        purpose: 'IEEE Club Meeting',
        booked: 'Saman Perera',
        capacity: 50,
        status: 'booked',
        bookingDate: '2024-03-20'
    },
    {
        id: 2,
        name: '5LB',
        purpose: 'SDGP Meeting',
        booked: 'Kalani Pathirana',
        capacity: 10,
        status: 'occupied',
        bookingDate: '2024-03-19'
    },
    {
        id: 3,
        name: '3LC',
        purpose: 'Standard',
        booked: 'Jackson Samuels',
        capacity: 2,
        status: 'free',
        bookingDate: '2024-03-18'
    }
]

interface RoomBookingProps extends BaseListProps {
    onCreateClick: () => void;
}

export default function RoomBooking({ onCreateClick, ...props }: RoomBookingProps) {
    const [rooms, setRooms] = useState<Room[]>(mockRooms)
    const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Add filter states
    const [filters, setFilters] = useState<Filters>({
        status: '',
        room: '',
        dateRange: 'all',
        searchQuery: ''
    })

    // Add useEffect for filtering rooms
    useEffect(() => {
        let result = [...rooms]

        // Apply status filter
        if (filters.status) {
            result = result.filter(room => room.status === filters.status)
        }

        // Apply room filter
        if (filters.room) {
            result = result.filter(room => room.name.toLowerCase().includes(filters.room.toLowerCase()))
        }

        // Apply date range filter
        if (filters.dateRange !== 'all') {
            const today = new Date()
            result = result.filter(room => {
                if (!room.bookingDate) return false
                const bookingDate = new Date(room.bookingDate)
                const diffTime = Math.abs(today.getTime() - bookingDate.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                
                return filters.dateRange === 'recent' ? diffDays <= 7 : diffDays > 7
            })
        }

        // Apply search query
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase()
            result = result.filter(room =>
                room.name.toLowerCase().includes(query) ||
                room.purpose.toLowerCase().includes(query) ||
                room.booked.toLowerCase().includes(query)
            )
        }

        setFilteredRooms(result)
    }, [rooms, filters])

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
            status: '',
            room: '',
            dateRange: 'all',
            searchQuery: ''
        })
    }

    return (
        <>
            <BaseList
                title="Room Bookings"
                createButtonLabel="Add Room"
                {...props}
                onCreateClick={onCreateClick}
            >
                {/* Add Filter Section */}
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                                placeholder="Search by room name, purpose, or booked by"
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                            />
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
                                <option value="booked">Booked</option>
                                <option value="occupied">Occupied</option>
                                <option value="free">Free</option>
                            </select>
                        </div>

                        {/* Room Filter */}
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
                                {rooms.map(room => (
                                    <option key={room.id} value={room.name}>
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter */}
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
                        Showing {filteredRooms.length} of {rooms.length} rooms
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Room Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Purpose
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Booked
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Capacity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Booking Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRooms.map((room) => (
                            <motion.tr
                                key={room.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {room.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {room.purpose}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {room.booked}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {room.capacity}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        room.status === 'booked'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : room.status === 'occupied'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {room.bookingDate ? new Date(room.bookingDate).toLocaleDateString() : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedRoom(room)}
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </BaseList>
        </>
    )
}
