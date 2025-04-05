import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5zzgEpNakWPXNGb0HoUXqoKpxwfReJ4U",
  authDomain: "chronotix-5e3ea.firebaseapp.com",
  projectId: "chronotix-5e3ea",
  storageBucket: "chronotix-5e3ea.appspot.com",
  messagingSenderId: "342528942533",
  appId: "1:342528942533:web:f7a3ec3a7f21e2c20fc9ae"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Create axios instance
export const api = axios.create({
  baseURL: 'https://chronotix-se-57.onrender.com/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add interceptor to add token to requests
api.interceptors.request.use((config) => {
  // For development, always add a token
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token') || 'development-token'}`;
  return config;
})

interface User {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  role: string
  phone?: string
  department?: string
  bio?: string
  title?: string
  expertise?: string
  office_hours?: string
  created_at?: string
}

interface UniversityDetails {
  name: string;
  address: string;
  phone?: string;
  website?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signup: (email: string, password: string, firstName: string, lastName: string, username: string, universityDetails: UniversityDetails) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial mount
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user')
      const token = localStorage.getItem('access_token')
      
      if (storedUser && token) {
        try {
          // First set the stored user data
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          
          // Then verify token and update with fresh data
          const response = await api.get('/user/profile')
          if (response.data) {
            const userData = {
              id: response.data._id || response.data.id,
              email: response.data.email,
              username: response.data.username,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              role: response.data.role
            }
            setUser(userData)
            // Update stored user data with fresh data
            localStorage.setItem('user', JSON.stringify(userData))
          }
        } catch (error) {
          console.error('Failed to restore session:', error)
          // Clear stored data if verification fails
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('firebase_token')
          setUser(null)
        }
      }
    }

    loadUser()
  }, [])

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    universityDetails: UniversityDetails
  ) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        username,
        role: 'admin', // Force admin role for new accounts
        university: universityDetails
      })

      const { access_token, refresh_token, firebase_token, user: userData } = response.data

      if (!userData) {
        throw new Error('No user data received from server')
      }

      // Store tokens
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      if (firebase_token) {
        localStorage.setItem('firebase_token', firebase_token)
        try {
          await signInWithCustomToken(auth, firebase_token)
        } catch (error) {
          console.error('Firebase auth error:', error)
          // Continue even if Firebase auth fails
        }
      }

      // Store user data and update state
      const userToStore = {
        id: userData._id || userData.id,
        email: userData.email,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role
      }
      localStorage.setItem('user', JSON.stringify(userToStore))
      setUser(userToStore)

      return response.data
    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(error.response?.data?.message || 'Failed to create account')
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const { access_token, refresh_token, firebase_token, user: userData } = response.data

      if (!userData) {
        throw new Error('No user data received from server')
      }

      // Store tokens
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      if (firebase_token) {
        localStorage.setItem('firebase_token', firebase_token)
        try {
          await signInWithCustomToken(auth, firebase_token)
        } catch (error) {
          console.error('Firebase auth error:', error)
          // Continue even if Firebase auth fails
        }
      }

      // Store user data and update state
      const userToStore = {
        id: userData._id || userData.id,
        email: userData.email,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role
      }
      localStorage.setItem('user', JSON.stringify(userToStore))
      setUser(userToStore)

    } catch (error: any) {
      console.error('Login error:', error)
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear stored data
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('firebase_token')
      
      // Sign out from Firebase
      try {
        await firebaseSignOut(auth)
      } catch (error) {
        console.error('Firebase sign out error:', error)
      }
      
      setUser(null)
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      // Set authorization header with the token
      const token = localStorage.getItem('access_token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      // Send update request to the API
      const response = await api.put('/user/profile', profileData);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Update user in state and localStorage
      const updatedUser = {
        ...user,
        ...response.data,
        id: response.data._id || response.data.id
      };
      
      setUser(updatedUser as User);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser as User;
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.response?.data?.error || 'Failed to update profile');
    }
  };

  const value = {
    isAuthenticated,
    user,
    signup,
    login,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 