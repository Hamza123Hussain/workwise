import axios from 'axios'

export async function getUser(userID: string) {
  try {
    const response = await axios.get(
      `https://octtoppus-backend-b76z.vercel.app/GetUser`,
      {
        params: { userID },
      }
    )
    return response.data
  } catch (error) {
    if (error) {
      // If the server responded with a status other than 2xx
      console.error('Error fetching user:', error)
      return { success: false, message: error }
    } else {
      // If the request was made but no response was received, or another error occurred
      console.error('Error fetching user:', error)
      return {
        success: false,
        message: 'An error occurred while fetching user data',
      }
    }
  }
}
