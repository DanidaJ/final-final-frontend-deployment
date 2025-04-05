import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' }
]

export default function Layout() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 w-full">
        <div className={isLandingPage ? '' : ''}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
} 