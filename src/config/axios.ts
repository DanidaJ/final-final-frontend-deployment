import axios from 'axios'

// Create axios instance with custom config
const instance = axios.create({
  baseURL: 'https://chronotix-se-57.onrender.com', // Flask server URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Disable credentials since we're using token auth
})

// Add a request interceptor for handling tokens
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage - use access_token instead of token
    const token = localStorage.getItem('access_token')
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request for debugging
    console.log('API Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
      data: config.data
    })

    return config
  },
  (error) => {
    console.error('API Request error:', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor for handling common errors
instance.interceptors.response.use(
  (response) => {
    // Log successful response for debugging
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    return response
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        url: error.config.url,
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      })

      // Handle authentication errors
      if (error.response.status === 401) {
        // Clear token if it's invalid
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Network Error:', {
        url: error.config.url,
        error: 'No response received',
        request: error.request
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', {
        message: error.message,
        config: error.config
      })
    }
    return Promise.reject(error)
  }
)

export default instance 