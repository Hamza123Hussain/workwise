import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { GetAllAttendance } from '../Attendance/AllAttendance'
import { groupByUserData } from '../Attendance/GroupEdAttendance'

export const getAttendance = async (
  UserEmail: string,
  setLoading: (loading: boolean) => void,
  setGroupedAttendance: (attendance: {
    [key: string]: AttendanceRecord[]
  }) => void
) => {
  setLoading(true)
  try {
    const data = await GetAllAttendance(UserEmail)
    if (data) {
      // Correct type for groupedData as an object with arrays of AttendanceRecord
      const groupedData = groupByUserData(data) as {
        [key: string]: AttendanceRecord[]
      }
      setGroupedAttendance(groupedData)
    }
    setLoading(false)
  } catch (error) {
    console.error(error)
    setLoading(false)
  }
}
