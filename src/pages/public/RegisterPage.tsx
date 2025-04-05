import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface FormData {
  universityName: string
  adminName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  address: string
  universityType: 'undergraduate' | 'postgraduate' | 'both' | ''
  studentCount: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    universityName: '',
    adminName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    universityType: '',
    studentCount: ''
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<FormData> = {}

    if (currentStep === 1) {
      if (!formData.universityName) newErrors.universityName = 'University name is required'
      if (!formData.adminName) newErrors.adminName = 'Administrator name is required'
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
    }

    if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Form submitted:', formData)
      // Handle successful registration
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-2 ring-blue-500 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Register Your University
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-gray-600 dark:text-gray-300 text-center font-medium"
            >
              Step {step} of 3
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative h-4 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner overflow-hidden">
              {/* Animated Progress */}
              <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-full shadow-md"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Name
                  </label>
                  <input
                    type="text"
                    value={formData.universityName}
                    onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.universityName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                    required
                  />
                  {errors.universityName && (
                    <p className="mt-1 text-sm text-red-600">{errors.universityName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Administrator Name
                  </label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.adminName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.adminName && (
                    <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.password
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.confirmPassword
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.phoneNumber
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Type
                  </label>
                  <select
                    value={formData.universityType}
                    onChange={(e) => setFormData({ ...formData, universityType: e.target.value as FormData['universityType'] })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.universityType
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}                  >
                    <option value="">Select university type</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="both">Both Undergraduate and Postgraduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Students
                  </label>
                  <input
                    type="number"
                    value={formData.studentCount}
                    onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                    className={`mt-3 px-4 block w-full rounded-md h-10 ${
                        errors.studentCount
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className={`mt-3 px-4 py-2 block w-full rounded-md ${
                        errors.address
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 shadow-lg shadow-red-500/50'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/50'
                    } dark:bg-gray-700 dark:text-white`}                  />
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-4">
              {/* Only show the Previous button from Step 2 onwards */}
              {step > 1 && (
                  <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Previous
                  </motion.button>
              )}

              {/* Align "Next" or "Complete Registration" buttons to the right */}
              <div className="flex w-full justify-end">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : step === 3
                                ? 'bg-green-600 hover:bg-green-700'  // Complete Registration button color
                                : 'bg-blue-600 hover:bg-blue-700'   // Next button color
                    }`}
                >
                  {isSubmitting
                      ? 'Processing...'
                      : step === 3
                      ? 'Complete Registration'  // Step 3 label
                      : 'Next'}
                </motion.button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 