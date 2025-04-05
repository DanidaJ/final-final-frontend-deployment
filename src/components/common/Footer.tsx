import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<null | 'success' | 'error'>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  // Check system preference for dark mode
  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(localStorage.getItem('theme') === 'dark' || isDark)

    // Listen for changes to the prefers-color-scheme media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        setIsDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter subscription logic here
    console.log('Subscribing email:', email)

    // Simulate API call with a timeout
    setTimeout(() => {
      setSubscribeStatus('success')
      setEmail('')

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscribeStatus(null)
      }, 3000)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative w-full">
        {/* Thin black border at top - replacing the purple wave */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>

        <div className="w-full">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img
                      src="/icon.png"
                      alt="Chronotix Logo"
                      className="w-10 h-10"
                  />
                  <h3 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                    Chronotix
                  </h3>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Smart scheduling solutions for educational institutions
                </p>
                <div className="flex space-x-4 mt-6">
                  {/* Social Media Links with hover effects */}
                  <a href="https://www.instagram.com/chronotix.io/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM17.25 5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/company/chronotix/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4V8h3v11zm-1.5-12.3c-.97 0-1.75-.79-1.75-1.75S4.53 3.2 5.5 3.2s1.75.79 1.75 1.75S6.47 6.7 5.5 6.7zM20 19h-3v-5.6c0-1.34-.02-3.07-1.88-3.07s-2.17 1.47-2.17 2.99V19h-3V8h2.89v1.51h.04c.4-.75 1.36-1.54 2.79-1.54 2.99 0 3.54 1.96 3.54 4.51V19z"/>
                    </svg>
                  </a>

                  <a href="https://www.youtube.com/@ChronoTix-co" target="_blank" rel="noopener noreferrer"
                     className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110">
                    <span className="sr-only">YouTube</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a2.956 2.956 0 0 0-2.08-2.084C19.04 3.5 12 3.5 12 3.5s-7.04 0-9.418.602A2.956 2.956 0 0 0 .502 6.186C0 8.563 0 12 0 12s0 3.437.502 5.814a2.956 2.956 0 0 0 2.08 2.084C4.96 20.5 12 20.5 12 20.5s7.04 0 9.418-.602a2.956 2.956 0 0 0 2.08-2.084C24 15.437 24 12 24 12s0-3.437-.502-5.814zM9.75 15.585V8.415L15.5 12l-5.75 3.585z"/>
                    </svg>
                  </a>

                  <button
                      onClick={toggleDarkMode}
                      className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
                      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-600 after:mt-2">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <Link to="/solutions" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Solutions
                  </Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <Link to="/pricing" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Pricing
                  </Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <Link to="/contact" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Contact
                  </Link>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <Link to="/about" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-600 after:mt-2">
                Resources
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <a href="/documentation" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Documentation
                  </a>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <a href="/resources" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Resources
                  </a>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <a href="/privacy" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Privacy and Policy
                  </a>
                </li>
                <li className="transition-transform duration-300 hover:translate-x-1">
                  <a href="/terms" className="text-base text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-600 after:mt-2">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                Get the latest updates and news delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <svg className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 py-2 text-base text-gray-900 dark:text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-sm transition-all duration-300"
                        placeholder="Enter your email"
                    />
                  </div>
                  <button
                      type="submit"
                      className="inline-flex shrink-0 items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>

                {/* Subscription Status Messages */}
                {subscribeStatus === 'success' && (
                    <div className="mt-2 flex items-center text-green-500 text-sm">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Successfully subscribed!
                    </div>
                )}
                {subscribeStatus === 'error' && (
                    <div className="mt-2 flex items-center text-red-500 text-sm">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Error subscribing. Please try again.
                    </div>
                )}
              </form>

              {/* Language Selector */}
              <div className="mt-6">
                <div className="relative inline-block">
                  <select
                      className="appearance-none pl-3 pr-10 py-2 text-base text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-6 flex flex-col items-center">
            {/* Copyright in the middle */}
            <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-4">
              © {currentYear} Chronotix. All rights reserved.
            </p>

            {/* Cookie Preferences & Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/cookies" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                Cookie Preferences
              </a>
              <a href="/privacy" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Improved Scroll to Top Button */}
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-md shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 z-50 border border-gray-600 backdrop-blur-sm"
            aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
        </button>
      </footer>
  )
}