import { AttendanceRecord } from './AttendanceInterface'
import { TaskFetch } from './TaskformInterface'

interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
}
export interface ReportCardProps {
  mergedData: MergedUserData[]
}
