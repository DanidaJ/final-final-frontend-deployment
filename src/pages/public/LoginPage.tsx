import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface SocialLoginButton {
  name: string
  icon: JSX.Element
  bgColor: string
  hoverColor: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log('Starting login submission...')
      await login(formData.email, formData.password)
      console.log('Login successful, navigating to dashboard')
      
      // Small delay to ensure state updates are complete
      setTimeout(() => {
        navigate('/dashboard')
      }, 100)
    } catch (err: any) {
      console.error('Login error in LoginPage:', err)
      setError(err.message || 'Invalid email or password. Please try again.')
      // Log additional error details if available
      if (err.response) {
        console.error('Error response:', err.response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const socialLogins: SocialLoginButton[] = [
    {
      name: 'Google',
      icon: (
        <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="w-5 h-5" />
      ),
      bgColor: 'bg-white dark:bg-gray-700',
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-600'
    },
    {
      name: 'Microsoft',
      icon: (
        <img src="https://img.icons8.com/color/24/000000/microsoft.png" alt="Microsoft" className="w-5 h-5" />
      ),
      bgColor: 'bg-white dark:bg-gray-700',
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-600'
    },
    {
      name: 'Apple',
      icon: (
        <img 
          src="https://img.icons8.com/ios-filled/24/ffffff/mac-os.png" 
          alt="Apple" 
          className="w-5 h-5 dark:invert-0 invert" 
        />
      ),
      bgColor: 'bg-white dark:bg-gray-700',
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-600'
    }
  ]

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic here
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
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-6 w-full flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {socialLogins.map((provider) => (
                  <motion.button
                    key={provider.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialLogin(provider.name)}
                    className={`flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 
                      ${provider.bgColor} ${provider.hoverColor} border border-gray-200 dark:border-gray-600 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200`}
                  >
                    <span className="sr-only">Sign in with {provider.name}</span>
                    {provider.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
              </span>
              <Link
                to="/create-account"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create account
              </Link>
            </div>
          </div>
        </motion.div>
        
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
} 