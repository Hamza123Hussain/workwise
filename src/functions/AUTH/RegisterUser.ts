import axios from 'axios'
import { InputValues, UserData } from './SignUpInterface'
export const RegisterUser = async (
  inputValues: InputValues
): Promise<UserData | void> => {
  const { email, Name, password, Image } = inputValues
  const formData = new FormData()
  formData.append('Name', Name)
  formData.append('Email', email)
  formData.append('password', password)
  if (Image) {
    formData.append('Image', Image)
  }
  try {
    const response = await axios.post(
      'http://localhost:8000/Api/Auth/Signup',
      formData
    )
    // console.log('User registered successfully:', response.data)
    return response.data.user
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
