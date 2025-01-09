import { AttendanceRecord } from '@/utils/Interfaces/AttendanceInterface'

// Filter attendance records based on selected month
export const filteredAttendance = (
  groupedAttendance: { [key: string]: AttendanceRecord[] },
  selectedMonth: number
) =>
  Object.keys(groupedAttendance).reduce((acc, key) => {
    const recordsForMonth = groupedAttendance[key].filter(
      (record) => new Date(record.currentDate).getMonth() === selectedMonth
    )
    if (recordsForMonth.length > 0) {
      acc[key] = recordsForMonth
    }
    return acc
  }, {} as { [key: string]: AttendanceRecord[] })
