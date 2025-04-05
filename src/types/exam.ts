export interface Exam {
  _id: string
  module: string
  class: string
  examType: 'midterm' | 'final' | 'quiz' | 'assignment'
  date: string
  startTime: string
  endTime: string
  room: string
  supervisor: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  description?: string
}

export interface ExamFormData {
  module: string
  class: string
  examType: 'midterm' | 'final' | 'quiz' | 'assignment'
  date: string
  startTime: string
  endTime: string
  room: string
  supervisor: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  description: string
} 