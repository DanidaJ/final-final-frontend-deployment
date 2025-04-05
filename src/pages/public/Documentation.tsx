import { motion } from 'framer-motion'

export default function Documentation() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-gray-50/50 dark:bg-gray-900/50">
      {/* Background with grid and gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/50 dark:to-indigo-950/50" />
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30 mask-gradient" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50/90 to-transparent dark:from-blue-950/50 dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 
            border border-blue-200 dark:border-blue-800 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50">
            Documentation
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Getting Started Guide
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to use ChronoTix effectively with our comprehensive documentation.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8
            border border-gray-100 dark:border-gray-700"
        >
          {/* Quick Start */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Quick Start
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Create your account and verify your email</li>
                <li>Set up your institution profile</li>
                <li>Import or add your resources (rooms, teachers, etc.)</li>
                <li>Create your first schedule</li>
              </ol>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </span>
              Key Features
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Schedule Management</h3>
                  <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Automated timetable generation</li>
                    <li>Conflict detection</li>
                    <li>Resource optimization</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Resource Management</h3>
                  <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Room allocation</li>
                    <li>Teacher assignments</li>
                    <li>Equipment tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Best Practices
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Regularly update resource availability</li>
                <li>Set clear scheduling policies</li>
                <li>Use tags for better organization</li>
                <li>Monitor analytics for optimization</li>
              </ul>
            </div>
          </section>

          {/* API Reference */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </span>
              API Reference
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Access our API documentation for system integration:
                </p>
                <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <code className="text-blue-600 dark:text-blue-300">
                    https://api.chronotix.com/v1/documentation
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              Support
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Need help? Contact our support team:
              </p>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Email: support@chronotix.com</p>
                <p>Phone: +94 70 244 9566</p>
                <p>Live Chat: Available 24/7</p>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="pt-8 text-sm text-gray-500 dark:text-gray-400 text-center border-t border-gray-100 dark:border-gray-700">
            Last updated: March 15, 2024
          </div>
        </motion.div>
      </div>
    </div>
  )
} 