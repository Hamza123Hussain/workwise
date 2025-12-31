import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const DeleteRoleTasks = async (RoleTasksId: string, UserID: string) => {
  try {
    const response = await axios.delete(`${ApiUrl}Api/RoleTask/DeleteTask`, {
      params: { RoleTasksId, UserID },
    })
    toast.success('Role Deleted Successfully')
    return response.data.deletedRoleTask
  } catch (error: any) {
    if (error.response?.status === 404) toast.error('Role not found')
    else if (error.response?.status === 401) toast.error('Not authorized')
    else toast.error(error.response?.data?.message || 'Delete failed')
    console.error(error)
    return null
  }
}
