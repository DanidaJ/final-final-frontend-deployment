import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
    gmail?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ahamath Jaufer',
    role: 'Founder & CEO',
    image: '/team/ahamath.jpg',
    bio: 'Experienced software architect with a passion for educational technology. Led multiple successful EdTech projects.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/ahamath/',
      gmail: 'mailto:ahamath@chronotix.com',
      github: 'https://github.com/Asfack-Ahamath',
    }
  },
  {
    name: 'Danida Jayakody',
    role: 'Head of Product',
    image: '/team/danida.png',
    bio: 'Product strategist with 8+ years of experience in educational software development and user experience design.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/danida-jayakody-52a884200/',
      gmail: 'mailto:jayakodydanida@gmail.com',
      github: 'https://github.com/DanidaJ'
    }
  },
  {
    name: 'Hiruka Tennakoon',
    role: 'Senior Software Engineer',
    image: '/team/hiruka.png',
    bio: 'Experienced software engineer with a focus on backend development and AI integration.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/hiruka-tennakoon/',
      gmail: 'mailto:hirukasanketh@gmail.com',
      github: 'https://github.com/HirukaTennakoon'
    }
  },
  {
    name: 'Neluki Hamangoda',
    role: 'UX Designer',
    image: '/team/neluki.png',
    bio: 'UX designer with a keen eye for user experience and a passion for educational technology.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/neluki-hamangoda-598049280/',
      gmail: 'mailto:neluki.navithma@gmail.com',
      github: 'https://github.com/neluki13'
    }
  },
  {
    name: 'Navyaa Manivannan',
    role: 'Marketing Manager',
    image: '/team/navyaa.png',
    bio: 'Marketing manager with a background in digital marketing and educational technology.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/navyaa-manivannan-32902a268/',
      gmail: 'mailto:navyaamanivann@gmail.com',
      github: 'https://github.com/thecoder-9'
    }
  },
  {
    name: 'Yenuli Liyanage',
    role: 'Data Scientist',
    image: '/team/yenuli.png',
    bio: 'Data scientist with a focus on data analysis and machine learning for educational technology.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/yenuli-liyanage/',
      gmail: 'mailto:liyanageyenuli@gmail.com',
      github: 'https://github.com/yenuli21'
    }
  }
]

// Define types for the animation configuration
interface IconMotion {
  animate: {
    y?: number[];
    rotate?: number[];
    scale?: number[];
    opacity?: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    repeatType?: "mirror" | "loop" | "reverse";
    ease?: string;
  };
}

// Update the milestones with properly typed animation configuration
const milestones = [
  {
    year: '2024 October',
    title: 'Company Founded',
    description: 'ChronoTix was established with a vision to revolutionize educational scheduling.',
    icon: '🚀',
    iconMotion: {
      animate: { y: [0, -10, 0], rotate: [0, 10, 0] },
      transition: { duration: 2, repeat: Infinity, repeatType: "mirror" }
    } as IconMotion,
    color: 'blue'
  },
  {
    year: '2025 January',
    title: 'First Major Release',
    description: 'Launched our core scheduling platform, serving over 50 institutions.',
    icon: '🎯',
    iconMotion: {
      animate: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] },
      transition: { duration: 2.5, repeat: Infinity, repeatType: "mirror" }
    } as IconMotion,
    color: 'indigo'
  },
  {
    year: '2025 March',
    title: 'International Expansion',
    description: 'Expanded operations to serve educational institutions globally.',
    icon: '🌍',
    iconMotion: {
      animate: { rotate: [0, 360] },
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    } as IconMotion,
    color: 'purple'
  }
]

const stats = [
  { label: 'Schools', value: '500+' },
  { label: 'Students', value: '100,000+' },
  { label: 'Countries', value: '25+' },
  { label: 'Satisfaction', value: '98%' }
]

const values = [
  {
    icon: '🎯',
    title: 'Innovation',
    description: 'Continuously pushing the boundaries of educational technology'
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Working together to create better educational outcomes'
  },
  {
    icon: '💡',
    title: 'Excellence',
    description: 'Committed to delivering the highest quality solutions'
  },
  {
    icon: '🌍',
    title: 'Accessibility',
    description: 'Making education accessible to everyone, everywhere'
  }
]

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true })
  const [missionRef, missionInView] = useInView({ triggerOnce: true })
  const [teamRef, teamInView] = useInView({ triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true })

  return (
    <div className="min-h-screen-without-nav bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 mask-gradient"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50/90 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Revolutionizing Education Scheduling
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              We're a team of passionate innovators dedicated to transforming educational scheduling through cutting-edge technology and intelligent automation.
            </p>

            {/* Demo Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/demo"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                  text-white font-semibold transition-all duration-200 group"
              >
                Watch Demo
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2+ Years</div>
                <div className="text-gray-600 dark:text-gray-300">Of Innovation</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Institutions Served</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Users</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
      </div>

      {/* Mission Section */}
      <motion.section
          ref={missionRef}
          className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden"
      >
        {/* Subtle background details */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent dark:from-blue-900/10" />
          <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-purple-50/30 to-transparent dark:from-purple-900/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Content Column */}
            <div className="space-y-10">
              {/* Updated Heading Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-1 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                      Our Mission
                    </h2>
                  </div>
                </div>

                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                  At ChronoTix, we believe that efficient scheduling is the foundation of successful education.
                  Our AI-powered platform streamlines complex scheduling processes, allowing institutions to
                  focus on what matters most - delivering quality education.
                </p>
              </div>

              {/* Enhanced Stats Section */}
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg opacity-50 blur" />
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border border-blue-100/50 dark:border-blue-800/50">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">100</span>
                      <span className="text-2xl font-bold text-blue-600/70 dark:text-blue-400/70">+</span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 font-medium">Institutions Served</p>
                  </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-50 blur" />
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">50</span>
                      <span className="text-2xl font-bold text-purple-600/70 dark:text-purple-400/70">K+</span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 font-medium">Daily Active Users</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Image Column */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
            >
              {/* Image wrapper with enhanced effects */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 blur-xl transition-all duration-500 group-hover:opacity-50" />

                <div className="relative rounded-xl overflow-hidden">
                  <img
                      src="/templates/thumbnails/CHRONOO.webp"
                      alt="Our Mission"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-blue-900/10 to-transparent opacity-60" />

                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts is passionate about creating innovative solutions 
              for educational institutions worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                  group relative border border-gray-200 dark:border-gray-700
                  hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 
                      transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-3 text-center relative">
                  <h3 className="text-lg font-bold mb-1">
                    <span className="text-blue-600 dark:text-blue-400">
                      {member.name.split(' ')[0]}
                    </span>
                    <br />
                    <span className="text-gray-900 dark:text-white">
                      {member.name.split(' ')[1]}
                    </span>
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300
                    transform group-hover:translate-y-0 translate-y-2">
                    <div className="flex justify-center space-x-4">
                      {Object.entries(member.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 
                            transition-all duration-300 transform hover:scale-125"
                        >
                          <span className="sr-only">{platform}</span>
                          <i
                              className={`${
                                  platform === 'gmail'
                                      ? 'fas fa-envelope' // For Gmail, use solid envelope
                                      : `fab fa-${platform}` // For other platforms, use brand icons
                              } text-xl`}
                          />


                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
          ref={timelineRef}
          className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
      >
        {/* Background Elements - Softer gradients for better balance */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white dark:from-gray-900/30 dark:to-gray-900" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blue-50/10 to-transparent dark:from-blue-900/5" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-purple-50/10 to-transparent dark:from-purple-900/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-20"
            >
                {/* Section Title with improved contrast */}
                <div className="inline-flex items-center justify-center space-x-3 mb-6">
                    <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent dark:from-blue-400" />
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Our Journey
                        </span>
                    </h2>
                    <div className="h-px w-12 bg-gradient-to-l from-purple-500 to-transparent dark:from-purple-400" />
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                    From our founding to present day, we've been committed to innovation and excellence.
                </p>
            </motion.div>

            <div className="relative">
                {/* Timeline line with balanced gradient */}
                <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-blue-300 via-purple-300 to-blue-300 dark:from-blue-700 dark:via-purple-700 dark:to-blue-700 -translate-x-1/2" />

                {/* Timeline items */}
                <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2 }}
                            className={`relative flex ${
                                index % 2 === 0 ? 'justify-start' : 'justify-end'
                            }`}
                        >
                            <div className={`w-1/2 flex ${
                                index % 2 === 0 ? 'pr-12' : 'pl-12'
                            } ${
                                index % 2 === 0 ? 'items-end' : 'items-start'
                            }`}>
                                {/* Timeline node with improved contrast */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                                    <div className={`w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-2 border-${milestone.color}-500 dark:border-${milestone.color}-400 flex items-center justify-center shadow-md`}>
                                        <div className={`w-4 h-4 bg-gradient-to-br from-${milestone.color}-500 to-${milestone.color}-600 dark:from-${milestone.color}-400 dark:to-${milestone.color}-500 rounded-full`} />
                                    </div>
                                </div>

                                {/* Content Card with balanced colors */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative group w-full"
                                >
                                    {/* Card Background Glow - softer in light mode, more visible in dark */}
                                    <div className={`absolute -inset-2 bg-gradient-to-r from-${milestone.color}-500/10 to-purple-500/10 dark:from-${milestone.color}-500/20 dark:to-purple-500/20 rounded-2xl opacity-50 blur-xl transition-all duration-500 group-hover:opacity-75`} />

                                    {/* Card Content with improved contrast */}
                                    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                        {/* Year Badge with consistent color scheme */}
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                                            <span className="text-blue-700 dark:text-blue-300 font-semibold">
                                                {milestone.year}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            {milestone.title}
                                        </h3>

                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {milestone.description}
                                        </p>

                                        {/* Animated Icon */}
                                        <motion.div 
                                            className="absolute top-4 right-4 text-2xl"
                                            initial={{ opacity: 0.2 }}
                                            animate={milestone.iconMotion.animate}
                                            transition={milestone.iconMotion.transition}
                                            whileHover={{ scale: 1.2, opacity: 1 }}
                                        >
                                            {milestone.icon}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white dark:bg-gradient-to-b from-black via-black to-black " />
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/20 to-transparent blur-2xl" />
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden"
          >
            {/* Main Container Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

            {/* Animated Border Effect */}
            <div className="absolute inset-0 p-[1px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 animate-gradient-x" />
            </div>

            {/* Content Container */}
            <div className="relative px-8 py-16 md:px-16 md:py-24">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-10"
              >
                {/* Enhanced Heading */}
                <div className="space-y-6">
                  <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block"
                  >
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-purple-300 border border-purple-950 text-blue-950 dark:text-blue-400 text-sm font-medium">
                Limited Time Offer
              </span>
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold">
              <span className="block text-blue-950 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                Transform Your Institution
              </span>
                    <span className="block mt-3 text-white">
                With Next-Gen Scheduling
              </span>
                  </h2>

                  <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Join the future of educational scheduling with our AI-powered platform.
                    Start your journey today.
                  </p>
                </div>

                {/* Enhanced Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { title: 'Lightning Fast Setup', description: 'Get started in under 10 minutes', highlight: 'blue' },
                    { title: '24/7 Premium Support', description: 'Expert assistance anytime', highlight: 'purple' },
                    { title: 'Seamless Migration', description: 'Zero-loss data transfer', highlight: 'indigo' }
                  ].map((feature, index) => (
                      <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="relative group"
                      >
                        <div className={`absolute inset-0 bg-${feature.highlight}-500/10 rounded-xl blur-xl 
                  transition-opacity duration-300 opacity-0 group-hover:opacity-100`} />
                        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6
                  border border-gray-700 hover:border-gray-600 transition-colors duration-300">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                  ))}
                </div>

                {/* Enhanced Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
                  <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r
                from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25"
                      onClick={() => window.location.href = '/register'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative font-semibold text-white">
               Get Started
              </span>
                  </motion.button>

                  <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group px-8 py-4 rounded-xl bg-gray-800 border border-gray-700
                hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
                      onClick={() => window.location.href = '/contact'}
                  >
              <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                Contact Sales
              </span>
                  </motion.button>
                </div>

                {/* Trust Indicators */}
                <div className="pt-12 border-t border-gray-800">
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                  >
                    <p className="text-gray-400 text-sm">
                      Trusted by leading educational institutions worldwide
                    </p>
                    <div className="flex justify-center space-x-8">
                      <img src="/templates/thumbnails/IIT.jpg" alt="IIT" className="h-20 w-30 rounded-md object-cover" />
                      <img src="/templates/thumbnails/Westminster.png" alt="Westminster" className="h-20 w-45 rounded-md object-cover" />
                      <img src="/templates/thumbnails/Robert.jpg" alt="Robert Gorden" className="h-20 w-25 rounded-md object-cover" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 