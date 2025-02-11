import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

interface UpdateAttendanceData {
  Email: string
  id: string
  ExitTime: string
  CheckInStatus: boolean
}

export const updateAttendance = async (data: UpdateAttendanceData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/Api/Attendance/UpdateAttendance`,
      data
    )
    console.log('Attendance Updated Successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating attendance:', error)
    throw error
  }
}
