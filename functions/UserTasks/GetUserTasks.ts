import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const getUserTasks = async (UserId: string) => {
  const Response = await axios.get(
    `${ApiUrl}Api/UserTask/${UserId}/GetUserTasks`
  )
  try {
    if (Response.status === 200) {
      console.log('User Tasks', Response.data.data)
      return Response.data.data
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    if (Response.status === 500) {
      console.error('ERROR : ', Response.data.error)
    }
  }
}
