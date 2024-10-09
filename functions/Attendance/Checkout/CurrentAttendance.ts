// functions/Attendance/attendanceService.ts
import axios from 'axios'
import { CurrentAttendance } from '@/functions/Attendance/CurrentAttendance'
export const GetCurrentAttendance = async (
  email: string,
  setLoading: (loading: boolean) => void,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void
) => {
  setLoading(true)
  try {
    const Data = await CurrentAttendance(email)
    if (Data) {
      setAttendanceId(Data[0]._id)
      setCheckinStatus(Data[0].CheckInStatus)
    } else {
      setAttendanceId(null)
      setCheckinStatus(false)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      setAttendanceId(null)
      setCheckinStatus(false)
    } else {
      console.error('Error getting current attendance:', error)
    }
  } finally {
    setLoading(false)
  }
}
