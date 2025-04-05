export interface Group {
  _id?: string
  id?: number
  group_no: string
  intake: string
  level: 'L3' | 'L4' | 'L5' | 'L6' | 'L7'
  degree: string
  capacity: number
  enrolled: number
  status: 'active' | 'inactive'
  description?: string
  created_at?: string
  updated_at?: string
}

export type GroupFormData = Omit<Group, '_id' | 'id' | 'created_at' | 'updated_at'> 