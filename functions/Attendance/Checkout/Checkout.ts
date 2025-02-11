import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
interface UpdateAttendanceParams {
  email: string
  id: string
  exitTime: string | null
  checkInStatus: boolean
}
export const updateAttendance = async ({
  email,
  id,
  exitTime,
  checkInStatus,
}: UpdateAttendanceParams) => {
  try {
    if (exitTime) {
      const formattedExitTime = new Date(exitTime)

      const response = await axios.put(
        `${ApiUrl}Api/Attendance/UpdateAttendance`,
        {
          Email: email,
          id: id,
          ExitTime: formattedExitTime,
          CheckInStatus: checkInStatus,
        }
      )

      return response.data
    }
  } catch (error) {
    console.error('Error updating attendance:', error)
  }
}
