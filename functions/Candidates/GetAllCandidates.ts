import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
export const GetCandidates = async (Email: string) => {
  try {
    const Response = await axios.get(`${ApiUrl}Api/Candidate/GetALLCandidate`, {
      params: { Email },
    })
    if (Response.status === 200) {
      console.log('ALL DATA HERE:', Response.data)
      return Response.data // Return the fetched data for further use
    } else {
      console.warn('Unexpected response status:', Response.status)
      return null
    }
  } catch (error) {
    console.error('Error fetching candidates:', error)
    throw error // Rethrow the error for the caller to handle if needed
  }
}
