export interface Class {
  _id: string;
  name: string;
  class_type: 'Lecture' | 'Tutorial' | 'Lab' | 'Seminar' | 'Workshop';
  capacity: number;
  location: string;
  status: 'active' | 'inactive';
  description?: string;
  created_at?: string;
  updated_at?: string;
}