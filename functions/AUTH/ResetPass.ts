import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const handlePasswordReset = async (Email: string) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/Auth/Reset`, {
      Email,
    })
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    console.error('Error sending password reset email:', error)
  }
}
