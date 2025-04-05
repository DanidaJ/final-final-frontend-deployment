import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  username: string
  universityName: string
  universityAddress: string
  universityPhone: string
  universityWebsite: string
}

export default function CreateAccountPage() {
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    universityName: '',
    universityAddress: '',
    universityPhone: '',
    universityWebsite: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validate form data
    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (signUpData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (!signUpData.firstName || !signUpData.lastName) {
      setError('First name and last name are required')
      return
    }

    if (!signUpData.username) {
      setError('Username is required')
      return
    }

    if (!signUpData.universityName || !signUpData.universityAddress) {
      setError('University name and address are required')
      return
    }

    try {
      setIsLoading(true)
      console.log('Starting signup process...')
      const response = await signup(
        signUpData.email,
        signUpData.password,
        signUpData.firstName,
        signUpData.lastName,
        signUpData.username,
        {
          name: signUpData.universityName,
          address: signUpData.universityAddress,
          phone: signUpData.universityPhone,
          website: signUpData.universityWebsite
        }
      )
      console.log('Signup successful')
      
      // Show success message and disable form
      setSuccess(true)
      setIsLoading(true) // Keep form disabled
      
      // Open admin dashboard in new tab
      const dashboardUrl = `${window.location.origin}/dashboard`
      const newTab = window.open(dashboardUrl, '_blank')
      
      // If new tab was blocked, show additional message
      if (!newTab) {
        setError('Please allow pop-ups to open the admin dashboard in a new tab')
      }
      
      // Don't automatically navigate away - let user see the success message
    } catch (err: any) {
      console.error('Signup error in CreateAccountPage:', err)
      // Extract the specific error message
      let errorMessage = 'Failed to create account. Please try again.'
      if (err.message) {
        errorMessage = err.message
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      }
      setError(errorMessage)
      
      if (err.response) {
        console.error('Error response:', err.response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create Admin Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Set up your administrator account and university details
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Account created successfully!
                    </p>
                  </div>
                </div>
                <div className="text-sm text-green-700 dark:text-green-300 pl-8">
                  <p>Your admin account has been created. You can now:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Access the admin dashboard in the new tab</li>
                    <li>
                      <a 
                        href="/dashboard" 
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here
                      </a>
                      {' '}to open the dashboard if it didn't open automatically
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={`space-y-6 ${success ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={signUpData.firstName}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={signUpData.lastName}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={signUpData.username}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">University Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Name
                  </label>
                  <input
                    id="universityName"
                    name="universityName"
                    type="text"
                    required
                    value={signUpData.universityName}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="universityAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Address
                  </label>
                  <input
                    id="universityAddress"
                    name="universityAddress"
                    type="text"
                    required
                    value={signUpData.universityAddress}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="universityPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Phone
                  </label>
                  <input
                    id="universityPhone"
                    name="universityPhone"
                    type="tel"
                    value={signUpData.universityPhone}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="universityWebsite" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Website
                  </label>
                  <input
                    id="universityWebsite"
                    name="universityWebsite"
                    type="url"
                    value={signUpData.universityWebsite}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
} 