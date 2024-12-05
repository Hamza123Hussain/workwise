import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

interface NoticeUpdateInput {
  title?: string
  description?: string
  author?: string
}

export const updateNotice = async (id: string, data: NoticeUpdateInput) => {
  try {
    const response = await axios.put(`${ApiUrl}Api/Notice/UpdateNotice`, data)
    return response.data
  } catch (error) {
    console.error('Error updating notice:', error)
    throw error
  }
}
