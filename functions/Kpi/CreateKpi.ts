import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

/**
 * Creates a new KPI for a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Array<object>} targets - List of targets to be sent to the API.
 * @returns {Promise<object>} - The API response or error.
 */
export const createKPI = async (userId: string, targets: Array<object>) => {
  try {
    // Prepare the request payload
    const payload = {
      UserId: userId,
      Targets: targets,
    }

    // Make the API call to the KPIMaker endpoint
    const response = await axios.post(
      `${ApiUrl}Api/KPI/CreateNewKPI`, // Replace with your actual API endpoint
      payload,
      {
        headers: {
          'Content-Type': 'application/json', // Set appropriate headers
        },
      }
    )

    // Handle the successful response
    // console.log('KPI created successfully:', response.data)
    return response.data // Return the response data for further processing if needed
  } catch (error) {
    // Handle errors during the API call
    console.error('Error creating KPI:', error)
  }
}
