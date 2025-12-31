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

export const CreateRoleTasks = async (
  UserId: string,
  RoleName: string,
  Tasks: Task[]
) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/RoleTask/CreateNewTask`, {
      UserId,
      RoleName,
      Tasks,
    })

    toast.success('Role Created Successfully')
    return response.data.roleTasks
  } catch (error: any) {
    if (error.response?.status === 404) toast.error('User not found')
    else if (error.response?.status === 400) toast.error('Role already exists')
    else toast.error(error.response?.data?.message || 'Error creating role')
    console.error(error)
    return null
  }
}
