import axios from 'axios'
const deleteUser = async (email: string) => {
  try {
    const response = await axios.delete(
      `https://workwise-backend-puce.vercel.app/Api/Auth/DeleteUser?Email=${email}`,
      {
        params: { Email: email }, // Send email as query parameter
      }
    )

    return response.data // Return the response data
  } catch (error) {
    // Handle error
    console.error('Error deleting user:', error)
    throw error // You can also customize the error handling as needed
  }
}

export default deleteUser
