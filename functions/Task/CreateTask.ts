import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

// Define types for the task data
interface TaskData {
  description: string
  dueDate: string
  assignedTo: string | string[] // Allow assignedTo to be a string or an array of strings
  name: string
  Email: string
  priority: string
  TaskType: string
}

// Function to create a task
export const createTask = async (taskData: TaskData) => {
  try {
    // Ensure assignedTo is always an array of strings
    const assignedToArray = Array.isArray(taskData.assignedTo)
      ? taskData.assignedTo
      : [taskData.assignedTo] // Convert string to array

    // Create a new task object with assignedTo as an array
    const newTaskData = {
      ...taskData,
      assignedTo: assignedToArray,
    }

    const response = await axios.post(
      `${ApiUrl}Api/Task/CreateNewTask`,
      newTaskData
    )
    return response.data // Return the response data from the backend
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
