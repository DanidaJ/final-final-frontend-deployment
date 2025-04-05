import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, startOfWeek, addDays, addWeeks, subWeeks, parse, isWithinInterval, eachHourOfInterval, set } from 'date-fns'
import axios from 'axios'
import { api } from '../../../contexts/AuthContext'
import html2canvas from 'html2canvas'
import ReactDOM from 'react-dom/client'
import { BaseListProps } from '../../../types/common'

type ViewMode = 'week' | 'day' | 'month' | 'list'
type FilterView = 'all' | 'groups' | 'lecturers' | 'rooms'

interface Lecturer {
  id: string
  name: string
  department: string
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
  specialization: string[]
}

interface Module {
  id: string
  code: string
  name: string
  lecturerId: string
  credits: number
  level: string
  semester: string
  requiredSessions: {
    type: 'lecture' | 'tutorial' | 'lab'
    duration: number
    perWeek: number
  }[]
}

interface Group {
  id: string
  name: string
  size: number
  level: string
  moduleIds: string[] // Modules this group is enrolled in
}

interface Room {
  id: string
  name: string
  capacity: number
  type: 'lecture' | 'tutorial' | 'lab' | 'any'
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
}

interface TimeSlot {
  id: string
  moduleId: string
  groupId: string
  lecturerId: string
  roomId: string
  type: 'lecture' | 'tutorial' | 'lab'
  startTime: string
  endTime: string
  day: string
  color: string
  moduleName?: string
  moduleCode?: string
  lecturerName?: string
  roomName?: string
  groupName?: string
}

interface TimetableSettings {
  version: string;
  academicYear: string;
  semester: string;
  studyMode: 'fullTime' | 'partTime';
  startTime: string;
  endTime: string;
  timeFormat: '12h' | '24h';
  breaks: {
    name: string;
    startTime: string;
    endTime: string;
    days: string[]
  }[];
}

interface TimetableFilters {
  lecturer?: string
  module?: string
  group?: string
  room?: string
  type?: 'lecture' | 'tutorial' | 'lab'
  day?: string
  semester?: string
}

interface SavedTimetable {
  id: string
  timeSlots: TimeSlot[]
  settings: TimetableSettings
  createdAt: string
}

// Add new interface for filter selections
interface FilterSelections {
  groups: string[];
  lecturers: string[];
  rooms: string[];
  sessionTypes: ('lecture' | 'tutorial' | 'lab')[];
}

interface DownloadOptions {
  format: 'pdf' | 'excel' | 'image';
  includeBreaks: boolean;
  showLegend: boolean;
  orientation: 'portrait' | 'landscape';
  paperSize: 'a4' | 'a3' | 'letter';
}

interface TimeTableListProps extends BaseListProps {
  // Add any additional props specific to TimeTableList
}

export default function TimeTableList(props: TimeTableListProps) {
  return (
    <BaseList {...props} />
  );
}