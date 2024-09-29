import axios from 'axios'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8000/Api/Auth/SignIn', {
      Email: email,
      Password: password,
    })

    return response.data
  } catch (error: any) {
    // Handle error
    if (error.response) {
      console.error('Login failed:', error.response.data.message)
    } else {
      console.error('An error occurred:', error.message)
    }
    throw error
  }
}
