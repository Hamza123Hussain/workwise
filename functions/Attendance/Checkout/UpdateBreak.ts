import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'
export const updateBreak = async (
  userEmail: string,
  attendanceId: string,
  onBreak: boolean,
  breakTime: Date // Time for Break_Start or Break_End
) => {
  try {
    // Create the request body with required fields
    const requestBody = {
      Email: userEmail,
      id: attendanceId,
      Break_Time: breakTime.toISOString(), // Convert Date to ISO string
      onBreak: onBreak,
    }
    // Send the POST request
    const response = await axios.post(
      `${ApiUrl}Api/Attendance/Updatebreak`,
      requestBody
    )
    if (response.status === 200) {
      //   toast.success('Attendance updated successfully')
      console.log('Updated attendance:', response.data.attendance)
      return response.data.attendance // Return the updated attendance
    } else {
      toast.error('Failed to update attendance')
      return null
    }
  } catch (error) {
    console.error('Error updating break:', error)
    toast.error('Failed to update attendance')
    return null
  }
}
