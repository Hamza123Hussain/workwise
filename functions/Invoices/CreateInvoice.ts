import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'

import axios from 'axios'

export const createInvoice = async (Userid: string, data: any) => {
  const Response = await axios.post(`${ApiUrl}Api/Invoice/CreateInvoice`, {
    Userid,
    data,
  })

  try {
    if (Response.status === 404) {
      console.log('Not Authorized To Acess This Route')
    }
    if (Response.status === 201) {
      return Response.data
    }
  } catch (error) {
    // Handle errors during the API call
    console.error('Error creating Creating Invoice:', error)
  }
}
