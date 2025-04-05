export interface Degree {
  _id: string
  name: string
  code: string
  level: string
  credits: number
  department: string
  status: 'active' | 'inactive'
  description?: string
  modules?: string[] // Array of module IDs
}

export interface DegreeFormData {
  name: string
  code: string
  level: string
  credits: number
  department: string
  status: 'active' | 'inactive'
  description: string
  modules: string[] // Array of module IDs
} 