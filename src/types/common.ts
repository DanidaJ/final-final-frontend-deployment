import { ReactNode } from 'react';

export interface BaseListProps {
  title: string;
  createButtonLabel?: string;
  onCreateClick?: () => void;
  children?: ReactNode[];
  items?: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => Promise<void>;
  renderItem?: (item: any) => ReactNode;
  [key: string]: any; // Allow additional properties
}

export interface Lecture {
  id: number;
  title: string;
  subject: string;
  lecturer: string;
  schedule: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
} 