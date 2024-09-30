import { AttendanceRecord } from '@/utils/AttendanceInterface'

export const groupByUserData = (attendance: AttendanceRecord[]) => {
  return attendance.reduce((acc, record) => {
    const userData = record.UserData
    if (!acc[userData]) {
      acc[userData] = []
    }
    acc[userData].push(record)
    return acc
  }, {} as { [key: string]: AttendanceRecord[] })
}
