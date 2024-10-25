import { AttendanceRecord } from './AttendanceInterface'
import { UserFetched } from './SignUpInterface'
import { TaskFetch } from './TaskformInterface'

export interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
  userData: UserFetched
}
export interface ReportCardProps {
  mergedData: MergedUserData[]
}
