import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../contexts/AuthContext'

interface UniversityFormData {
  universityName: string
  department: string
  role: 'student' | 'lecturer' | 'admin'
  studentId?: string
}

export default function CreateUniversityPage() {
  const [universityData, setUniversityData] = useState<UniversityFormData>({
    universityName: '',
    department: '',
    role: 'student',
    studentId: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUniversityData({
      ...universityData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!user) {
        throw new Error('No user found')
      }

      // Save university details to server
      await api.post('/users/university', {
        userId: user.id,
        ...universityData
      })

      navigate('/dashboard')
    } catch (err: any) {
      console.error('Error saving university details:', err)
      setError(err.response?.data?.message || 'Failed to save university details')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <img
              src="/icon.png"
              alt="ChronoTix Logo"
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              University Details
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Complete your profile by adding your university information
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  University Name
                </label>
                <input
                  id="universityName"
                  name="universityName"
                  type="text"
                  required
                  value={universityData.universityName}
                  onChange={handleUniversityChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter university name"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={universityData.department}
                  onChange={handleUniversityChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter department name"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={universityData.role}
                  onChange={handleUniversityChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                    text-gray-700 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 
                    focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {universityData.role === 'student' && (
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Student ID
                  </label>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    required
                    value={universityData.studentId}
                    onChange={handleUniversityChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                      placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                      dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                    placeholder="Enter student ID"
                  />
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 