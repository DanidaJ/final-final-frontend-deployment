export interface User {
  id: number
  email: string
  username: string
  role: 'admin' | 'staff' | 'student'
}

export interface Schedule {
  id: number
  course_id: number
  room_id: number
  teacher_id: number
  day_of_week: number
  start_time: string
  end_time: string
  semester: string
  academic_year: string
}

export interface Room {
  id: number
  name: string
  capacity: number
  room_type: string
  building: string
  floor: number
  equipment: string[]
  is_active: boolean
}

export interface Course {
  id: number
  code: string
  name: string
  credits: number
  department: string
  description: string
  prerequisites: string[]
} 