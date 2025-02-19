import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const GetUserTasks = async (Name: string, Email: string) => {
  try {
    const Response = await axios.get(
      `${ApiUrl}Api/Task/GetUserTasks?Name=${Name}&Email=${Email} `
    )
    if (Response.status === 200) {
      return Response.data.AllTasks
    }
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
