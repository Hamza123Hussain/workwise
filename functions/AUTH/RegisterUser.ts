import axios from 'axios'
import toast from 'react-hot-toast' // Import toast
import { InputValues } from '../../utils/SignUpInterface'
import { ApiUrl } from '@/utils/AttendanceInterface'

export const registerUserWithImage = async (
  userData: InputValues,
  imageFile: File
) => {
  const formData = new FormData()

  // Append user data to FormData
  formData.append('Name', userData.Name)
  formData.append('Email', userData.email)
  formData.append('password', userData.password)
  formData.append('Salary', userData.Salary)
  formData.append('JobDescription', userData.JobDescription)
  formData.append('JobTitle', userData.JobTitle)

  // Append the image file if provided
  if (imageFile) {
    formData.append('Image', imageFile)
  }

  try {
    const response = await axios.post(`${ApiUrl}Api/Auth/Signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('User registered successfully:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed'
      console.error('Error registering user:', errorMessage)

      // Show appropriate toast notification

      toast.error('User already exists', {
        // Customize toast style (optional)
        style: {
          borderRadius: '8px',
          background: 'black',
          color: 'white',
        },
      })
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }
}
