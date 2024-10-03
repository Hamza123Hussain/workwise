import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
export const updateTask = async (
  taskId: string,
  email: string,
  progress: 'TODO' | 'IN_PROGRESS' | 'DONE',
  description: string,
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
) => {
  try {
    const response = await axios.put(`${ApiUrl}Api/Task/UpdateTask`, {
      id: taskId,
      Email: email,
      progress,
      description,
      priority,
    })

    return response.data // Returns the message and updated task
  } catch (error) {
    // Handle error
    console.error('Error updating task:', error)
  }
}
