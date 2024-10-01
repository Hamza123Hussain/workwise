import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const GetAllAttendance = async (email: string) => {
  try {
    const Response = await axios.get(
      `${ApiUrl}Api/Attendance/AllAttendance?Email=${email} `
    )
    if (Response.status === 200) {
      return Response.data
    }
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
