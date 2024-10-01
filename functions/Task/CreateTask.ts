import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

// Define types for the task data
interface TaskData {
  description: string
  dueDate: string
  assignedTo: string
  name: string
  Email: string
}

// Function to create a task
export const createTask = async (taskData: TaskData) => {
  try {
    const response = await axios.post(
      `${ApiUrl}Api/Task/CreateNewTask`,
      taskData
    )
    return response.data // Return the response data from the backend
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
