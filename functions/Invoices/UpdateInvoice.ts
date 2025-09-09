import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const UpdateInvoice = async (
  Userid: string,
  id: string,
  status: string
) => {
  const Response = await axios.post(
    `${ApiUrl}Api/Invoice//UpdateInvoiceStatus?Userid=${Userid}&id=${id}&status=${status}`
  )

  try {
    if (Response.status === 404) {
      console.log('Not Authorized To Acess This Route')
    }
    if (Response.status === 200) {
      return Response.data
    }
  } catch (error) {
    // Handle errors during the API call
    console.error('Error creating Creating Invoice:', error)
  }
}
