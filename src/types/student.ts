export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  iit_id: string;
  level: string;
  intake: string;
  group: string | null;
  degree_name: string;
  study_mode: 'Full-time' | 'Part-time';
  contact_number: string;
  optional_modules: string[];
  created_at: string;
  updated_at: string;
} 