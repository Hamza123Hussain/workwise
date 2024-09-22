import axios from 'axios'

export const handleSignup = async ({ name, email, password, image }) => {
  const formData = new FormData()
  formData.append('Name', name)
  formData.append('Email', email)
  formData.append('password', password)
  formData.append('Image', image)

  try {
    const res = await axios.post('/api/auth/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('User signed up:', res.data)
    return res.data
  } catch (error) {
    console.error(
      'Signup failed:',
      error.response ? error.response.data : error.message
    )
    return null
  }
}
