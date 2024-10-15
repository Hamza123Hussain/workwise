import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import { console } from 'inspector/promises'
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
    // Show toast notification for login errors

    // Display the error message returned from the server
    toast.error('In correct Email or Password')
    console.log(error)
  }
}
