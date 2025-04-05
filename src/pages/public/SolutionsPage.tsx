import { motion } from 'framer-motion'

interface Solution {
  title: string
  description: string
  icon: JSX.Element
  features: string[]
  benefits: string[]
}

const solutions: Solution[] = [
  {
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling system that optimizes class timings and resource allocation',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      'Automated timetable generation',
      'Conflict resolution',
      'Resource optimization',
      'Real-time adjustments'
    ],
    benefits: [
      'Save 80% scheduling time',
      'Reduce scheduling conflicts by 95%',
      'Optimize resource utilization',
      'Increase staff satisfaction'
    ]
  },
  {
    title: 'Resource Management',
    description: 'Comprehensive system for managing classrooms, labs, and equipment',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      'Room capacity tracking',
      'Equipment management',
      'Maintenance scheduling',
      'Usage analytics'
    ],
    benefits: [
      'Maximize space utilization',
      'Reduce maintenance costs',
      'Prevent double bookings',
      'Data-driven decisions'
    ]
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics and reporting system for data-driven decisions',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'Real-time monitoring',
      'Custom reports',
      'Performance metrics',
      'Trend analysis'
    ],
    benefits: [
      'Data-driven insights',
      'Improved efficiency',
      'Cost optimization',
      'Better planning'
    ]
  }
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 mask-gradient"></div>
        </div>

        <div className="w-full px-0 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Our Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Intelligent Solutions for Modern Education
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover how our cutting-edge technology can transform your educational institution's scheduling and resource management.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="w-full px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                border border-gray-100 dark:border-gray-700
                shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-6">
                {solution.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {solution.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg 
                        className="w-5 h-5 mr-3 mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Benefits
                </h4>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <svg 
                        className="w-5 h-5 mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500">
        <div className="w-full px-4 py-16">
          <div className="text-center max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the growing number of institutions that are revolutionizing their scheduling with ChronoTix.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold
                hover:bg-blue-50 transition-all duration-200"
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
} 