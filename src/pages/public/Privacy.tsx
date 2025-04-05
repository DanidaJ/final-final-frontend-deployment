import { motion } from 'framer-motion'

export default function Privacy() {
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
            Privacy Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Protecting Your Data & Privacy
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are committed to safeguarding your personal information and ensuring transparency in our data practices.
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
          {/* Data Collection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Data Collection
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Basic user information (name, email, institution)</li>
                <li>Schedule and timetable data</li>
                <li>Usage analytics and preferences</li>
                <li>System logs and performance data</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              Data Protection
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We implement robust security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls and authentication</li>
                <li>Secure data centers and backup systems</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Contact Us
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                For any privacy-related questions or concerns, please contact us at:
              </p>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Email: privacy@chronotix.com</p>
                <p>Phone: +94 70 244 9566</p>
                <p>Address: IIT City Office, 435 Galle Rd, Colombo</p>
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


