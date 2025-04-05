const BASE_URL = '/api'

// Add token validation function
export async function validateToken() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    // Instead of using a dedicated endpoint, try to fetch a simple resource
    // This will tell us if the token is valid without requiring a specific validation endpoint
    const response = await fetch(`${BASE_URL}/exams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // If we get a 401, the token is invalid
    // Any other response (even errors) means the token is at least recognized
    return response.status !== 401
  } catch (error) {
    console.error('Token validation error:', error)
    // Network errors shouldn't invalidate the token
    return true
  }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get the access_token instead of token
  const token = localStorage.getItem('access_token')
  
  // Debug log for authentication
  console.log('Auth Debug:', {
    hasToken: !!token,
    endpoint,
    method: options.method || 'GET'
  })

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  // Debug log for request details
  console.log('Request Headers:', headers)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
    
    if (!response.ok) {
      const error: any = new Error(`HTTP error! status: ${response.status}`)
      error.status = response.status
      try {
        const data = await response.json()
        error.message = data.message || `HTTP error! status: ${response.status}`
      } catch {
        error.message = response.statusText || `HTTP error! status: ${response.status}`
      }
      
      // Debug log for error response
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        message: error.message
      })
      
      throw error
    }

    return response.json()
  } catch (error) {
    // Debug log for network or other errors
    console.error('Network or API Error:', error)
    throw error
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  validateToken,

  // Schedules
  getSchedules: () => fetchWithAuth('/schedules'),
  createSchedule: (data: any) =>
    fetchWithAuth('/schedules', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateSchedule: (id: number, data: any) =>
    fetchWithAuth(`/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Rooms
  getRooms: () => fetchWithAuth('/rooms'),
  createRoom: (data: any) =>
    fetchWithAuth('/rooms', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Courses
  getCourses: () => fetchWithAuth('/courses'),
  createCourse: (data: any) =>
    fetchWithAuth('/courses', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  // Exams
  getExams: () => fetchWithAuth('/exams'),
  getExam: (id: string) => fetchWithAuth(`/exams/${id}`),
  createExam: (data: any) =>
    fetchWithAuth('/exams', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateExam: (id: string, data: any) =>
    fetchWithAuth(`/exams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteExam: (id: string) =>
    fetchWithAuth(`/exams/${id}`, {
      method: 'DELETE'
    }),
    
  // Assignments
  getAssignments: () => fetchWithAuth('/assignments'),
  getAssignment: (id: string) => fetchWithAuth(`/assignments/${id}`),
  createAssignment: (data: any) =>
    fetchWithAuth('/assignments', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateAssignment: (id: string, data: any) =>
    fetchWithAuth(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteAssignment: (id: string) =>
    fetchWithAuth(`/assignments/${id}`, {
      method: 'DELETE'
    })
} 