import axios from 'axios'

export const Allusers = async (email: string) => {
  try {
    const Response = await axios.get(
      `https://workwise-backend-puce.vercel.app/Api/Auth/AllUsers?Email=${email}`
    )
    if (Response.status === 200) {
      console.log('All Users', Response.data)
      return Response.data
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
