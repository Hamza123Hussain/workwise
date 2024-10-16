// functions/Attendance/attendanceService.ts
import axios from 'axios'
import { CurrentAttendance } from '@/functions/Attendance/CurrentAttendance'
import { LocationCoords } from '@/utils/AttendanceInterface'
export const GetCurrentAttendance = async (
  email: string,
  setLoading: (loading: boolean) => void,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void,
  setOnBreak: (status: boolean) => void,
  setLocation: (Location: LocationCoords) => void
) => {
  setLoading(true)
  try {
    const Data = await CurrentAttendance(email)
    if (Data) {
      setAttendanceId(Data[0]._id)
      setCheckinStatus(Data[0].CheckInStatus)
      setOnBreak(Data[0].onBreak)
      // setLocation({
      //   latitude: Data[0].latitude,
      //   longitude: Data[0].longitude,
      // })
    } else {
      setAttendanceId(null)
      setCheckinStatus(false)
      setOnBreak(false)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // If the error is an Axios error and the server responds with a 404 (Not Found),

      // Set 'attendanceId' to null (i.e., there's no attendance found)
      setAttendanceId(null)

      // Set 'checkinStatus' to false (i.e., the user is not checked in)
      setCheckinStatus(false)

      // Set 'onBreak' to false (i.e., the user is not on a break)
      setOnBreak(false)
    } else {
      // If the error is something else or the status is not 404,

      // Log the error to the console for debugging
      console.error('Error getting current attendance:', error)
    }
  } finally {
    setLoading(false)
  }
}
