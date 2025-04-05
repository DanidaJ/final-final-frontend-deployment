import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import { router } from './routes'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
