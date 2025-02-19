import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const GetUserTasks = async (userId: string) => {
  try {
    const Response = await axios.get(
      `${ApiUrl}Api/UserTask/GetUserTasks?UserId==${userId} `
    )
    if (Response.status === 200) {
      return Response.data.data
    }
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
