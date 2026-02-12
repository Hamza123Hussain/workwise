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
  RoleName: string,
  Tasks: Task[],
  Users: any[], // Changed from UserId: string to Users array
) => {
  try {
    // We send 'Users' in the body to match your backend destructuring:
    // const { RoleName, Tasks, Users } = req.body
    const response = await axios.post(`${ApiUrl}Api/RoleTask/CreateNewTask`, {
      RoleName,
      Tasks,
      Users,
    })

    toast.success('Role Created Successfully')
    return response.data.roleTasks
  } catch (error: any) {
    const errorMessage = error.response?.data?.message

    if (error.response?.status === 404) {
      toast.error('One or more users not found')
    } else if (errorMessage === 'Role already exists') {
      toast.error('This role name is already taken')
    } else {
      toast.error(errorMessage || 'Error creating role')
    }

    console.error('CreateRoleTasks Error:', error)
    return null
  }
}
