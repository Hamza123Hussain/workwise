import axios from 'axios'

export const handleSignOut = async () => {
  try {
    const response = await axios.get(
      'https://octtoppus-backend-b76z.vercel.app/API/AUTH/SignOut'
    )
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    console.error('Sign-out error:', error)
  }
}
