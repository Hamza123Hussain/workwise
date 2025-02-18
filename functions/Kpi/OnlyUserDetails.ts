import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const GettingOnlyUserDetails = async (UserID: string) => {
  const Response = await axios.get(`${ApiUrl}Api/KPI/useronly?UserID=${UserID}`)
  try {
    if (Response.status === 404) {
      toast.error('NO USERS HAVE BEEN FOUND')
    }
    if (Response.status === 200) {
      console.log('user data exists : ', Response.data)
      return Response.data
    }
  } catch (error) {
    console.error(`SOME ERROR HAS OCCURED : `, error)
    if (Response.status === 500) {
      console.log('THERE IS SOME ERROR', Response.data)
    }
  }
}
export interface Userss {
  _id: string
  UserId: string
  UserEmail: string
  UserName: string
}
