import axios from 'axios'

export const handleSignup = async (name, email, password, image) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)
  formData.append('Name', name)

  // Append the image file if provided
  if (Image) {
    formData.append('Image', Image)
  }

  // Debug: Check formData contents
  for (let [key, value] of formData.entries()) {
    console.log(FormData) // Log each key-value pair in FormData
  }

  try {
    const res = await axios.post(
      'http://localhost:8000/Api/Auth/Signup',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      }
    )
    console.log('User signed up:', res.data)
    // return res.data
  } catch (error) {
    console.error(
      'Signup failed:',
      error.response ? error.response.data : error.message
    )
    return null
  }
}

/**import axios from 'axios'
import { InputValues, UserData } from './SignUpInterface'
export const RegisterUser = async (
  inputValues: InputValues
): Promise<UserData | void> => {
  const { email, password, Name, Image } = inputValues
  try {
    // Create a FormData object

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
 */
