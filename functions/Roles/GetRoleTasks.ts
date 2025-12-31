import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const GetRoleTasks = async (UserID: string) => {
  try {
    const Response = await axios.get(
      `${ApiUrl}Api/RoleTask/GetAllRoleTasks?UserID=Hlk8DgN8pKf26WMI2wgP4bCY9oR2`
    )

    if (Response.status === 401) {
      toast.error('Role Not Found')
      return null
    }

    return Response.data
  } catch (error: any) {
    console.error(error)
    toast.error(error.response?.data?.message || 'Failed to fetch tasks')
    return null
  }
}
