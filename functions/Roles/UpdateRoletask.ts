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

// Created a flexible interface for the Update Payload
export interface UpdatePayload {
  Tasks?: Task[]
  Users?: { UserId: string }[]
  RemoveTaskId?: string
  RemoveUserId?: string
}

export const UpdateRoleTasks = async (
  RoleTasksId: string,
  UserId: string,
  payload: UpdatePayload, // Changed from Tasks: Task[] to a flexible payload
) => {
  try {
    // Spread the payload into the request body
    // This allows sending Tasks, Users, or Removal IDs dynamically
    const response = await axios.put(`${ApiUrl}Api/RoleTask/UpdateTask`, {
      RoleTasksId,
      UserId,
      ...payload,
    })

    // We don't always want a toast for every small background update,
    // but keeping it for now as per your original logic
    toast.success(response.data.message || 'Updated Successfully')
    return response.data.roleTasks
  } catch (error: any) {
    const msg = error.response?.data?.message

    if (error.response?.status === 404) {
      toast.error('Role or User not found')
    } else {
      toast.error(msg || 'Update failed')
    }

    console.error('Update Error:', error)
    return null
  }
}
