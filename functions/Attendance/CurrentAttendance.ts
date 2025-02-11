import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const CurrentAttendance = async (Email: string) => {
  const Response = await axios.get(
    `${ApiUrl}Api/Attendance/CurrentAttendance?Email=${Email}`
  )
  try {
    if (Response.status == 200) {
      console.log('Attendance Data Here : ', Response.data)
      return Response.data
    } else if (Response.status === 404) {
      return false
    }
  } catch (error) {
    console.error('Error getting current attendance:', error)
    throw error
  }
}
