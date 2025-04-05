import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GettingStarted = () => {
  const steps = [
    {
      title: "Create an Account",
      description: "Sign up for ChronoTix using your university email address or organization credentials.",
      code: `// Example API call for registration
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@university.edu',
    password: '********',
    role: 'faculty'
  })
});`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      title: "Set Up Your Profile",
      description: "Complete your profile by adding your department, preferences, and schedule constraints.",
      code: `// Example profile configuration
const preferences = {
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  preferredDays: ['Monday', 'Wednesday', 'Friday'],
  constraints: ['No back-to-back classes']
};`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Import Your Calendar",
      description: "Connect your existing calendar to sync your availability and existing commitments.",
      code: `// Example calendar integration
const calendarConfig = {
  provider: 'google',
  scope: ['calendar.readonly'],
  callback: '/api/calendar/callback'
};

// Initialize sync
await initializeCalendarSync(calendarConfig);`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Start Scheduling",
      description: "Begin creating and managing your schedules with our intuitive interface.",
      code: `// Example scheduling request
const scheduleRequest = {
  semester: 'Fall 2024',
  courses: ['CS101', 'CS202', 'CS303'],
  rooms: ['Room A101', 'Lab B202'],
  constraints: preferences
};

const schedule = await generateSchedule(scheduleRequest);`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
              Getting Started
            </h1>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Follow these simple steps to start using ChronoTix for your scheduling needs
            </p>
          </motion.div>
        </div>
            </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="sticky top-24">
              <nav className="space-y-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Help Center
                  </h2>
                  <div className="grid gap-2">
                    {docLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${link.href === '/docs/getting-started' 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50'
                          }
                          hover:shadow-md transform hover:-translate-y-[0.5px]`}
                      >
                        <div className={`${link.href === '/docs/getting-started' 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400'
                        }`}>
                          {link.icon}
                        </div>
                        <span className="ml-3">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                    </nav>
            </div>
          </motion.div>

                {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      {/* Gradient Border Effect */}
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
                      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                            <div className="text-blue-600 dark:text-blue-400">
                              {step.icon}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Step {index + 1}: {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {step.description}
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto shadow-inner">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
                    </div>
            </div>
        </div>
    );
};

// Documentation Links Data
const docLinks = [
  {
    name: 'Getting Started',
    href: '/docs/getting-started',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'FAQ',
    href: '/docs/faq',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Features',
    href: '/docs/features',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: 'Troubleshooting',
    href: '/docs/troubleshooting',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

export default GettingStarted;
