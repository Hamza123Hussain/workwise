import axios from 'axios'

export const handleResetPassword = async (email) => {
  try {
    const res = await axios.post('/api/auth/reset-password', { Email: email })
    console.log('Password reset email sent:', res.data)
    return res.data
  } catch (error) {
    console.error(
      'Password reset failed:',
      error.response ? error.response.data : error.message
    )
    return null
  }
}
