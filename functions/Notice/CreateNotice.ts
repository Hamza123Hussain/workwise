import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

interface NoticeInput {
  title: string
  description: string
  author: string
}

export const createNotice = async (data: NoticeInput) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/Notice/NewNotice`, data)
    return response.data
  } catch (error) {
    console.error('Error creating notice:', error)
    throw error
  }
}
