import { motion } from 'framer-motion'

export default function Terms() {
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
            Terms and Conditions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Our Service Agreement
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our scheduling platform.
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
          {/* Service Usage */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Service Usage
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>You must be at least 18 years old to use this service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>Your use of the service must comply with all applicable laws</li>
                <li>You agree not to misuse or attempt to disrupt our service</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              User Responsibilities
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Maintain accurate and up-to-date information</li>
                <li>Protect your account credentials</li>
                <li>Report any unauthorized access immediately</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              Intellectual Property
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>All content and features are owned by ChronoTix</li>
                <li>You may not copy or reproduce any part of our service</li>
                <li>Your feedback and suggestions become our property</li>
                <li>We respect intellectual property rights of others</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg mr-2 border border-blue-100 dark:border-blue-800">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              Termination
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>We may terminate service at our discretion</li>
                <li>You may cancel your subscription at any time</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Some obligations survive termination</li>
              </ul>
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


