import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const getUserTasksForCurrentMonth = async (UserId: string) => {
  const Response = await axios.get(
    `${ApiUrl}Api/UserTask/GetTasksForCurrentMonth`,
    { params: { UserId } }
  )
  try {
    if (Response.status === 200) {
      console.log('Total Data Here : ', Response.data)
      return { data: Response.data.data, count: Response.data.count }
    }
  } catch (error) {
    console.error('Error fetching monthly tasks:', error)
    if (Response.status === 500) {
      console.log(Response.data.message, '', Response.data.error)
    }
  }
}
