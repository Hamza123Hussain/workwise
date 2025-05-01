import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const getUserTasksForEachMonth = async (UserId: string) => {
  const response = await axios.get(
    `${ApiUrl}Api/UserTask/GetTasksForEachMonth`,
    { params: { UserId } }
  )
  try {
    if (response.status === 200) {
      console.log('All User Tasks For Each Month', response.data)
      return response.data
    }
  } catch (error) {
    console.error('Error fetching monthly tasks:', error)
    if (response.status === 500) {
      console.log(response.data.message, '', response.data.error)
    }
  }
}
