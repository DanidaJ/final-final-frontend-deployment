import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling that optimizes class timings and resource allocation.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Analytics',
    description: 'Comprehensive insights into resource utilization and scheduling patterns.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Real-time Updates',
    description: 'Instant notifications for schedule changes and important updates.',
    color: 'from-green-500 to-lime-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    title: 'Role-based Access',
    description: 'Secure access control for administrators, staff, and students.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Auto Sync',
    description: 'Seamless synchronization across all devices with real-time backup.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile Ready',
    description: 'Access your schedule anytime, anywhere with our mobile-first design.',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    title: 'Conflict Resolution',
    description: 'Automatic detection and resolution of scheduling conflicts.',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Resource Optimization',
    description: 'Maximize resource utilization with intelligent allocation.',
    color: 'from-orange-500 to-fuchsia-500'
  }
]

const stats = [
  {
    value: '10K+',
    label: 'Active Users',
    description: 'Trusted by institutions worldwide'
  },
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable service availability'
  },
  {
    value: '50%',
    label: 'Time Saved',
    description: 'Improved scheduling efficiency'
  },
  {
    value: '24/7',
    label: 'Support',
    description: 'Round-the-clock assistance'
  }
]

const testimonials = [
  {
    quote: "ChronoTix has revolutionized how we manage our academic scheduling. The AI-powered system has saved us countless hours of manual work.",
    author: "Dr. Bianca Delroy",
    role: "Dean of Academic Affairs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "The platform's intuitive interface and powerful features have made resource management effortless. A game-changer for our institution.",
    author: "Arthur Rodriguez",
    role: "IT Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Outstanding support team and regular updates keep the system running smoothly. Highly recommended for any educational institution.",
    author: "Serena Michelle",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
]

export default function LandingPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Mouse movement animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 200 }
  const moveX = useSpring(mouseX, springConfig)
  const moveY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - currentTarget.clientWidth / 2)
    mouseY.set(clientY - top - currentTarget.clientHeight / 2)
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800"
        onMouseMove={handleMouseMove}
      >
        {/* Background Elements */}
        <motion.div
          style={{ x: moveX, y: moveY }}
          className="absolute inset-0 opacity-30 dark:opacity-20"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-10"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white mb-4">
                Intelligent Scheduling
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-200 dark:to-slate-400">
                Made Simple
              </span>
            </h1>
            <p className="mt-8 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your institution's scheduling with AI-powered automation and real-time optimization
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
              <Link
                to="/login"
                className="group inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 dark:from-slate-200 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <svg 
                  className="ml-2 -mr-1 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  const offset = 780; // Adjust the scroll offset as needed
                  window.scrollBy({ top: offset, behavior: "smooth" });
                }}
                className="group inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Learn More
                <svg 
                  className="ml-2 -mr-1 w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-slate-300/30 to-slate-400/30 dark:from-slate-700/30 dark:to-slate-600/30 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-slate-400/30 to-slate-300/30 dark:from-slate-600/30 dark:to-slate-700/30 rounded-full filter blur-3xl" />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-500 flex justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 dark:text-gray-300"
            >
              Everything you need to manage your institution's scheduling needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl 
                  transition-all duration-300 h-full hover:shadow-2xl dark:shadow-gray-800/50 overflow-visible">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} 
                    opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} 
                    text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 
                    group-hover:text-transparent group-hover:bg-clip-text 
                    group-hover:bg-gradient-to-r group-hover:from-[#007CF0] group-hover:to-[#00DFD8]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 
                    transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={statsInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-600/5 dark:from-slate-400/5 dark:to-slate-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-200 dark:to-slate-400 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
            >
              Trusted by Leading Institutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 dark:text-gray-300"
            >
              Here's what our users have to say
            </motion.p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-purple-900 dark:from-purple-900 dark:to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white sm:text-4xl mb-8"
          >
            Ready to Transform Your Institution?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-purple-50 md:text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black   bg-white hover:bg-white md:text-lg "
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const solutions = [
  {
    title: 'Academic Planning',
    description: 'Comprehensive tools for academic schedule management',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: [
      'Course scheduling optimization',
      'Faculty workload management',
      'Student group allocation',
      'Curriculum planning'
    ]
  },
  {
    title: 'Resource Management',
    description: 'Efficient allocation and tracking of institutional resources',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      'Room capacity optimization',
      'Equipment tracking',
      'Maintenance scheduling',
      'Usage analytics'
    ]
  }
] 