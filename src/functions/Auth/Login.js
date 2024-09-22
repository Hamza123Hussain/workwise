import axios from 'axios'

export const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.post('/api/auth/login', {
      Email: email,
      Password: password,
    })
    console.log('User logged in:', res.data)
    return res.data
  } catch (error) {
    console.error(
      'Login failed:',
      error.response ? error.response.data : error.message
    )
    return null
  }
}
