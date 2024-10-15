import { ApiUrl } from '@/utils/AttendanceInterface'
import axios, { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
export const loginUser = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${ApiUrl}Api/Auth/SignIn`,
      {
        Email: email,
        Password: password,
      }
    )
    return response.data // Return the expected response data
  } catch (error) {
    // Handle error
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        // 401 status code for unauthorized, assuming it's incorrect credentials
        toast.error('Incorrect password or email!')
      } else {
        // Handle other specific errors if necessary
        toast.error('An error occurred while logging in.')
      }
    } else {
      // Handle non-Axios errors (network issues, etc.)
      toast.error('An error occurred while logging in.')
    }

    console.error('Login failed:', error)
    throw error // Re-throw the error to allow the caller to handle it further
  }
}
