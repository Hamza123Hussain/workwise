import axios from 'axios'

export const handleSignOut = async () => {
  try {
    const response = await axios.get(
      'https://workwise-backend-five.vercel.app/Api/Auth/Signout'
    )
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    console.error('Sign-out error:', error)
  }
}
