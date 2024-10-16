import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { GetUserAttendance } from '../Attendance/UserAttendance'

export const getAttendance = async (
  setLoading: (loading: boolean) => void,
  email: string,
  selectedUser: string
): Promise<AttendanceRecord[]> => {
  setLoading(true)
  try {
    const data = await GetUserAttendance(email, selectedUser)
    if (data) {
      return data // Return the data if it exists
    } else {
      return [] // Return an empty array if no data
    }
  } catch (error) {
    console.error(error)
    return [] // Return an empty array in case of an error
  } finally {
    setLoading(false)
  }
}
