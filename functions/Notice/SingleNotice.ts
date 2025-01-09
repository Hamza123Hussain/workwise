import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const fetchSingleNotice = async (id: string) => {
  try {
    const response = await axios.get(`${ApiUrl}Api/Notice/GetAllNotices ${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching notice:', error)
    throw error
  }
}
