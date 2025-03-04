import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
export const fetchUserTasks = async (UserId: string) => {
  try {
    const response = await axios.get(
      `${ApiUrl}Api/UserTask/GetUserTasks?UserId=${UserId}`
    )
    console.log('Response Status:', response.status)
    if (response.status === 200) {
      console.log('Tasks retrieved successfully:', response.data)
      return {
        success: true,
        data: response.data.data,
        status: response.status,
      }
    } else {
      console.warn('Unexpected response:', response)
      return {
        success: false,
        message: 'Unexpected response',
        status: response.status,
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error Status:', error.response.status)
      console.error('Error Message:', error.response.data.message)

      return {
        success: false,
        message: error.response.data.message,
        status: error.response.status,
      }
    } else {
      console.error('Unexpected error:', error)
      return { success: false, message: 'Something went wrong', status: 500 }
    }
  }
}
