import { LocationCoords } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const createNewAttendance = async (
  Email: string,
  EntryTime: string,
  CheckInStatus: boolean
  // location: LocationCoords
) => {
  try {
    const response = await axios.post(
      `https://workwise-backend-puce.vercel.app/Api/Attendance/NewAttendace`,
      { Email, EntryTime, CheckInStatus }
    )
    console.log('New Attendance Created Successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating new attendance:', error)
    throw error
  }
}
