import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export interface Task {
  TaskName: string
  Priority: 'Low' | 'Medium' | 'High'
  Completed?: boolean
  Description?: string
  DueDate?: string
}

export const UpdateRoleTasks = async (
  RoleTasksId: string,
  UserId: string,
  Tasks: Task[]
) => {
  try {
    const response = await axios.put(`${ApiUrl}Api/RoleTask/UpdateTask`, {
      RoleTasksId,
      UserId,
      Tasks,
    })

    toast.success('Role Tasks Updated')
    return response.data.roleTasks
  } catch (error: any) {
    if (error.response?.status === 404) {
      toast.error('Role or User not found')
    } else if (error.response?.status === 400) {
      toast.error('Invalid Data')
    } else {
      toast.error(error.response?.data?.message || 'Update failed')
    }
    return null
  }
}
