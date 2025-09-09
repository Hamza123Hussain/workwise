import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const GetInvoices = async (Userid: string) => {
  const Response = await axios.post(
    `${ApiUrl}Api/Invoice/GetInvoices?Userid=${Userid}`
  )

  try {
    if (Response.status === 404) {
      console.log('Not Authorized To Acess This Route')
    }
    if (Response.status === 200) {
      console.log('Response', Response)
      return Response.data
    }
  } catch (error) {
    // Handle errors during the API call
    console.error('Error creating Creating Invoice:', error)
  }
}
