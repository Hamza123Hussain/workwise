// functions/Attendance/attendanceService.ts
import axios from 'axios'
import { CurrentAttendance } from '@/functions/Attendance/CurrentAttendance'
export const GetCurrentAttendance = async (
  email: string,
  setLoading: (loading: boolean) => void,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void,
  setOnBreak: (status: boolean) => void
) => {
  setLoading(true)
  try {
    const Data = await CurrentAttendance(email)
    if (Data) {
      setAttendanceId(Data[0]._id)
      setCheckinStatus(Data[0].CheckInStatus)
      setOnBreak(Data[0].onBreak)
    } else {
      setAttendanceId(null)
      setCheckinStatus(false)
      setOnBreak(false)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      setAttendanceId(null)
      setCheckinStatus(false)
      setOnBreak(false)
    } else {
      console.error('Error getting current attendance:', error)
    }
  } finally {
    setLoading(false)
  }
}
