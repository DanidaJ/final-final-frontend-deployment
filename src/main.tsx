import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'

// Configure axios
axios.defaults.withCredentials = true

// Add interceptor to add token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    // For development only - add a development token if no token is found
    console.log('No token found, using development token')
    config.headers.Authorization = 'Bearer development-token'
  }
  return config
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
