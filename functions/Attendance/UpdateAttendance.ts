import { ApiUrl, LocationCoords } from '@/utils/AttendanceInterface'
import axios from 'axios'

interface UpdateAttendanceData {
  Email: string
  id: string
  ExitTime: string
  CheckInStatus: boolean
}

export const updateAttendance = async (data: UpdateAttendanceData) => {
  try {
    const response = await axios.post(
      `${ApiUrl}Api/Attendance/UpdateAttendance`,
      data
    )
    console.log('Attendance Updated Successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating attendance:', error)
    throw error
  }
}
