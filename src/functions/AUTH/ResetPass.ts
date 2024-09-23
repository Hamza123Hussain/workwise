import axios from 'axios'

export const handlePasswordReset = async (email: string) => {
  try {
    const response = await axios.post(
      'https://octtoppus-backend-b76z.vercel.app/API/AUTH/Reset',
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
