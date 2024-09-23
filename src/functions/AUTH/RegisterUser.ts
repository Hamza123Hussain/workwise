import axios from 'axios'
import { InputValues, UserData } from './SignUpInterface'
export const RegisterUser = async (
  inputValues: InputValues
): Promise<UserData | void> => {
  const { email, password, Name, Image } = inputValues
  try {
    // Create a FormData object
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('Name', Name)

    // Append the image file if provided
    if (Image) {
      formData.append('image', Image)
    }
    // Send the POST request with FormData
    const response = await axios.post<UserData>(
      `https://octtoppus-backend-b76z.vercel.app/api/Auth/register`, // Ensure this is the correct endpoint
      formData
    )
    if (response.status === 201) {
      return response.data // Return the UserData object
    }
  } catch (error) {
    console.error('Error in RegisterUser function:', error)
  }
}
