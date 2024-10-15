import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/Auth/SignIn`, {
      Email: email,
      Password: password,
    })

    // Handle successful login
    const userData = response.data
    console.log('User logged in successfully:', userData)
    // Optionally, redirect or set user state here

    // Show success message
    toast.success('Login successful!')
    return response.data
  } catch (error) {
    const axiosError = error as { response?: { data: { message: string } } }

    // Show toast notification for login errors
    if (axiosError.response) {
      // Display the error message returned from the server
      toast.error(axiosError.response.data.message)
    } else {
      // General error message for unexpected issues
      toast.error('An unexpected error occurred while logging in.')
    }
  }
}
