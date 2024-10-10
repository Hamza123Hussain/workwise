import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

// Define the interface for the request body
interface UpdateBreakRequest {
  Email: string
  id: string
  onBreak: boolean
  Break_Start?: string // Optional property
  Break_End?: string // Optional property
}

export const updateBreak = async (
  userEmail: string,
  attendanceId: string,
  onBreak: boolean,
  breakStart?: Date, // Optional parameter for break start time
  breakEnd?: Date // Optional parameter for break end time
) => {
  try {
    // Create the request body with required fields
    const requestBody: UpdateBreakRequest = {
      Email: userEmail,
      id: attendanceId,
      onBreak: onBreak,
    }

    // Include break start and end times if provided
    if (breakStart) {
      requestBody.Break_Start = breakStart.toISOString() // Convert to ISO string
    }
    if (breakEnd) {
      requestBody.Break_End = breakEnd.toISOString() // Convert to ISO string
    }

    // Send the POST request
    const response = await axios.post(
      `${ApiUrl}Api/Attendance/Updatebreak`,
      requestBody
    )

    if (response.status === 200) {
      toast.success('Attendance updated successfully')
      console.log('Updated attendance:', response.data.attendance)
      return response.data.attendance
    }
  } catch (error) {
    console.error('Error updating break:', error)
    toast.error('Failed to update attendance')
    return null
  }
}
