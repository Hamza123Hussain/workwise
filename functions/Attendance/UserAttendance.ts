import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const GetUserAttendance = async (email: string) => {
  try {
    const Response = await axios.get(
      `${ApiUrl}Api/Attendance/UserAttendance?Email=${email} `
    )
    if (Response.status === 200) {
      console.log('DATA IS HERE', Response.data)
      return Response.data
    }
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
