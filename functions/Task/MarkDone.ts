import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const MarkAsDone = async (
  taskId: string,
  email: string,
  progress: string,
  description: string,
  priority: string,
  name: string,
  dueDate: string // Expecting dueDate in a valid date format (e.g., 'YYYY-MM-DD')
) => {
  try {
    const currentDate = new Date()
    const dueDateObj = new Date(dueDate)

    // Reset hours, minutes, seconds, and milliseconds for accurate comparison
    currentDate.setHours(0, 0, 0, 0)
    dueDateObj.setHours(0, 0, 0, 0)

    if (dueDateObj < currentDate) {
      throw new Error('Cannot update task: Due date is in the past.')
    }

    if (dueDateObj < currentDate) {
      toast.error('Cannot update task: Due date is in the past.')
      throw new Error('Cannot update task: Due date is in the past.')
    }

    await axios.put(`${ApiUrl}Api/Task/UpdateTask`, {
      id: taskId,
      Email: email,
      progress,
      description,
      priority,
      name,
    })
    window.location.reload()
    toast.success('Task Has Been Updated')
  } catch (error) {
    // Handle error
    console.error('Error updating task:', error)
    throw error // Optional: re-throw the error for further handling
  }
}
