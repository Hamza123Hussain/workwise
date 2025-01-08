import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const GetMonthlyHours = async (UserId: string) => {
  try {
    // Make the API call to fetch the monthly hours worked
    const response = await axios.get(
      `${ApiUrl}Api/Attendance/GetHoursWorked?UserId=${UserId}`
    )

    // Check if the response status is 200 (success)
    if (response.status === 200) {
      console.log('Monthly Hours Worked:', response.data.HoursWorked)
      return response.data.HoursWorked // Return the total hours worked
    } else {
      console.error('Unexpected response:', response)
      return null // Return null if the response is not successful
    }
  } catch (error) {
    // Handle errors (network issues, server errors, etc.)
    console.error('Error fetching monthly hours:', error)
    return null
  }
}
