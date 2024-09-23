import axios from 'axios'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8000/Api/Auth/SignIn', {
      Email: email,
      Password: password,
    })

    // Handle success (e.g., save user data or token)
    console.log('User logged in successfully:', response.data)
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
