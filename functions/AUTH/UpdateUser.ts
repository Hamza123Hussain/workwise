import { InputValues } from '@/utils/SignUpInterface'
import axios from 'axios'

export const updateUser = async (userData: InputValues) => {
  try {
    const formData = new FormData()

    // Append the user data to the form
    formData.append('Email', userData.email)
    formData.append('JobTitle', userData.JobTitle)
    formData.append('Name', userData.Name)
    formData.append('Role', userData.Role ? userData.Role : 'No Role')
    // Append the image if provided
    if (userData.Image) {
      formData.append('Image', userData.Image) // 'Image' is the field name for the image file
    }

    // Make the POST request to the backend API
    const response = await axios.post(
      'https://workwise-backend-puce.vercel.app/Api/Auth/UpdateUser',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      }
    )

    if (response.status === 200) {
      console.log('User updated successfully', response.data.user)
      return response.data.user
    } else {
      console.error('Failed to update user', response.data.message)
    }
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
