import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProTips = () => {
  const tips = [
    {
      category: "Schedule Optimization",
      tips: [
        {
          title: "Smart Time Blocking",
          description: "Maximize productivity with strategic time blocking",
          details: [
            "Group similar classes or activities together",
            "Include buffer time between sessions",
            "Consider peak productivity hours",
            "Balance workload across the week"
          ],
          code: `// Example time blocking configuration
const timeBlocks = {
  morningBlock: {
    startTime: '09:00',
    endTime: '12:00',
    preferredActivities: ['lectures', 'workshops'],
    bufferTime: 15 // minutes
  },
  afternoonBlock: {
    startTime: '13:00',
    endTime: '16:00',
    preferredActivities: ['labs', 'tutorials'],
    bufferTime: 15
  }
};

// Apply time blocking preferences
schedule.applyTimeBlocks(timeBlocks);`
        },
        {
          title: "Advanced Constraints",
          description: "Use sophisticated scheduling constraints for better results",
          details: [
            "Set priority levels for different events",
            "Define flexible time ranges",
            "Specify location-based preferences",
            "Create custom scheduling rules"
          ],
          code: `// Example advanced constraints
const constraints = {
  priority: {
    high: ['CS101', 'CS202'],
    medium: ['MATH101'],
    low: ['ELECTIVE101']
  },
  timeRanges: {
    'CS101': {
      preferred: ['09:00-12:00'],
      acceptable: ['13:00-15:00'],
      avoid: ['16:00-18:00']
    }
  },
  locations: {
    preferredBuildings: ['Science', 'Engineering'],
    maxWalkingTime: 15 // minutes
  }
};`
        }
      ]
    },
    {
      category: "Calendar Integration",
      tips: [
        {
          title: "Multi-Calendar Sync",
          description: "Efficiently manage multiple calendars across platforms",
          details: [
            "Set up bi-directional syncing",
            "Configure selective event syncing",
            "Use calendar-specific colors",
            "Implement conflict resolution rules"
          ],
          code: `// Example multi-calendar setup
const calendarConfig = {
  google: {
    calendars: ['work', 'personal'],
    syncDirection: 'bidirectional',
    eventFilters: {
      work: ['meetings', 'deadlines'],
      personal: ['appointments']
    },
    colorMapping: {
      lectures: '#4285f4',
      labs: '#0f9d58',
      tutorials: '#db4437'
    }
  },
  outlook: {
    calendars: ['university'],
    syncDirection: 'import',
    eventFilters: ['classes', 'office-hours']
  }
};`
        },
        {
          title: "Smart Notifications",
          description: "Set up intelligent notification systems",
          details: [
            "Create custom notification rules",
            "Set up location-based reminders",
            "Configure priority-based alerts",
            "Use smart travel time calculations"
          ],
          code: `// Example notification setup
const notificationRules = {
  highPriority: {
    timing: [
      { before: '1 day' },
      { before: '1 hour' },
      { before: '15 minutes' }
    ],
    channels: ['email', 'push', 'sms']
  },
  mediumPriority: {
    timing: [
      { before: '1 hour' },
      { before: '15 minutes' }
    ],
    channels: ['push']
  },
  locationBased: {
    enabled: true,
    triggerDistance: '500m',
    travelTimeBuffer: 1.5 // factor
  }
};`
        }
      ]
    },
    {
      category: "Performance Optimization",
      tips: [
        {
          title: "Batch Operations",
          description: "Optimize performance with batch processing",
          details: [
            "Group similar schedule changes",
            "Use bulk update operations",
            "Implement efficient caching",
            "Optimize API requests"
          ],
          code: `// Example batch processing
const batchUpdates = async (changes) => {
  const batchSize = 50;
  const batches = [];
  
  // Group changes into batches
  for (let i = 0; i < changes.length; i += batchSize) {
    batches.push(changes.slice(i, i + batchSize));
  }
  
  // Process batches with rate limiting
  for (const batch of batches) {
    await Promise.all(batch.map(change => 
      processChange(change)
    ));
    await delay(100); // Rate limiting
  }
};`
        }
      ]
    }
  ];

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Gradient Background */}
      <div className="bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
              Pro Tips & Best Practices
            </h1>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Advanced techniques to get the most out of ChronoTix
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
            className="lg:w-64 flex-shrink-0"
          >
            <div className="sticky top-24">
              <nav className="space-y-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Guides
                  </h2>
                  <div className="space-y-2">
                    {docLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                          text-gray-600 hover:text-blue-600 hover:bg-blue-50
                          dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700/50"
                      >
                        {link.icon}
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div className="space-y-12">
                  {tips.map((category, categoryIndex) => (
                    <motion.div
                      key={categoryIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.category}
                      </h2>
                      <div className="space-y-6">
                        {category.tips.map((tip, tipIndex) => (
                          <motion.div
                            key={tipIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (categoryIndex + tipIndex) * 0.1 }}
                            className="relative group"
                          >
                            <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity" />
                            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {tip.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {tip.description}
                              </p>
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                  Key Points:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                  {tip.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                  ))}
                                 </ul>
                              </div>
                              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code>{tip.code}</code>
                              </pre>
                            </div>
                          </motion.div>
                        ))}
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
    name: 'Best Practices',
    href: '/best-practices',
    icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
  },
  {
    name: 'Pro Tips',
    href: '/docs/tips',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default ProTips;