import { AttendanceRecord } from '../../utils/AttendanceInterface'

export const countUniqueDates = (attendanceRecords: AttendanceRecord[]) => {
  const uniqueDates = new Set<string>()
  attendanceRecords.forEach((record) => {
    const date = new Date(record.currentDate).toLocaleDateString()
    uniqueDates.add(date)
  })
  return uniqueDates.size
}
