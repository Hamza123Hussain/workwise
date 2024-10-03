import axios from 'axios'
import { UserData } from '../../utils/SignUpInterface'
import { ApiUrl } from '@/utils/AttendanceInterface'
export const fetchUserData = async (
  email: string
): Promise<UserData | null> => {
  try {
    const response = await axios.get<UserData>(
      `${ApiUrl}Api/Auth/GetUser?Email=${email} `
    )

    if (response.status === 200) {
      return response.data
    } else {
      console.log('No user found')
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
