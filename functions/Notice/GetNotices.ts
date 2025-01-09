import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const fetchAllNotices = async () => {
  try {
    const response = await axios.get(`${ApiUrl}Api/Notice/GetAllNotices`)
    return response.data
  } catch (error) {
    console.error('Error fetching notices:', error)
    throw error
  }
}
