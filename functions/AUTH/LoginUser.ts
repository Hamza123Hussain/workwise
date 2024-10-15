import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/Auth/SignIn`, {
      Email: email,
      Password: password,
    })

    return response.data
  } catch (error) {
    // Handle error
    if (error) {
      console.error('Login failed:', error)
      toast.error('Incorrect Email or Password')
    } else {
      console.error('An error occurred:', error)
    }
    throw error
  }
}
