import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const GetSingleKpi = async (UserID: string) => {
  try {
    const user = UserID
    console.log(user)
    // Make the API call to fetch the KPI
    const response = await axios.get(
      `${ApiUrl}Api/KPI/SingleKpi?UserID=qdyyLorl9WR27GcAxkBbxHO4sWu1`
    )

    // Check for successful response
    if (response.status === 200) {
      console.log('DATA IS HERE:', response.data) // Log the data for debugging
      return response.data // Return the response data
    } else {
      // Handle unexpected status codes
      console.error(`Unexpected response status: ${response.status}`)
      return null // Return null for unexpected cases
    }
  } catch (error) {
    // Handle errors during the API call
    console.error('Error fetching KPI:', error)
    return null // Return null in case of an error
  }
}
