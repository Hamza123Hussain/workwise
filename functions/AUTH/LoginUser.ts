import axios from 'axios'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'https://workwise-backend-five.vercel.app/Api/Auth/SignIn',
      {
        Email: email,
        Password: password,
      }
    )

    return response.data
  } catch (error) {
    // Handle error
    if (error) {
      console.error('Login failed:', error)
    } else {
      console.error('An error occurred:', error)
    }
    throw error
  }
}
