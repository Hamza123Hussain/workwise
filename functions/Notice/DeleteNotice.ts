import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const deleteNotice = async (id: string) => {
  try {
    const response = await axios.delete(`${ApiUrl}Api/Notice/DeleteNotice${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting notice:', error)
    throw error
  }
}
