import axios from 'axios'

export const handlePasswordReset = async (email: string) => {
  try {
    const response = await axios.post(
      'https://workwise-backend-five.vercel.app/Api/Auth/Reset',
      {
        email,
      }
    )
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    console.error('Error sending password reset email:', error)
  }
}
