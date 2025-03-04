import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const fetchUserTasks = async (UserId: string) => {
  try {
    const response = await axios.get(
      `${ApiUrl}Api/UserTask/AllTasks?UserId=${UserId}`
    )

    console.log('Response Status:', response.status)

    return {
      success: true,
      data: response.data, // Ensure this is an array of tasks
      status: response.status,
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error Status:', error.response.status)
      console.error('Error Message:', error.response.data.message)

      return {
        success: false,
        message: error.response.data.message || 'Failed to fetch tasks',
        status: error.response.status,
      }
    } else {
      console.error('Unexpected error:', error)
      return { success: false, message: 'Something went wrong', status: 500 }
    }
  }
}
