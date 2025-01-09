import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const GetAllKpi = async (UserID: string) => {
  try {
    // Send a GET request to fetch all KPIs for the given UserID
    const response = await axios.get(
      `${ApiUrl}Api/KPI/GetAllKPIs?UserID=${UserID}`
    )

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      console.log('KPIs Data:', response.data) // Log the retrieved KPI data for debugging
      return response.data // Return the data from the response
    } else {
      console.error('Unexpected response status:', response.status) // Log if the response status is not 200
      return null // Return null if the status is not 200
    }
  } catch (error) {
    // Handle errors during the request
    console.error('Error fetching KPIs:', error) // Log the error for debugging
    throw new Error(`An error occurred while fetching KPIs. ${error}`) // Throw an error with a meaningful message
  }
}
