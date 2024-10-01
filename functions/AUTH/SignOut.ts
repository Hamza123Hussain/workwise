import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const handleSignOut = async () => {
  try {
    const response = await axios.get(`${ApiUrl}Api/Auth/Signout`)
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    console.error('Sign-out error:', error)
  }
}
