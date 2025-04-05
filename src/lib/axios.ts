import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chronotix-se-57.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    // Add a default authorization header for development
    'Authorization': 'Bearer development-token'
  },
  withCredentials: false // Disable credentials requirement
});

// Add request interceptor to add auth header
api.interceptors.request.use(
  (config) => {
    // You can add dynamic token here later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication error
      console.error('Authentication error:', error);
      // You can redirect to login page here if needed
    }
    return Promise.reject(error);
  }
);

export default api; 