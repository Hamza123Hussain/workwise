import axios from 'axios'
import toast from 'react-hot-toast'
export const fetchRoleBasedTasks = async (userID: string) => {
  try {
    // Perform the GET request using Axios
    const response = await axios.get(
      `https://workwise-backend-puce.vercel.app/Api/RoleTask/GetSingleRoleTask?UserID=${userID}`
    )
    // // Return the data if the request is successful
    // console.log('DATA HAS BEEN FETCHED ', response.data.data.Tasks)
    return response.data.data.Tasks // Assuming the role data is under `data.data`
  } catch (error) {
    // Handle errors gracefully
    const errorMessage = error || 'An error occurred'
    toast.error(`ERROR IN FETCHING ${errorMessage}`)
  }
}
