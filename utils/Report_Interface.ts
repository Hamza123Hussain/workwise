import { AttendanceRecord } from './AttendanceInterface'

import { TaskFetch } from './TaskformInterface'

export interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
  salary: string
}
export interface ReportCardProps {
  mergedData: MergedUserData[]
  totalTasks: number // Add this line
  highPriorityTasks: number
  lowPriorityTasks: number
}
