import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import axios from 'axios'

export const createTask = async (taskData: RoleTask) => {
  try {
    const response = await axios.post(
      `${ApiUrl}Api/UserTask/CreateNewTask   `,
      taskData
    )
    // Check if the response is successful
    if (response.status === 201) {
      console.log('Task created successfully:', response.data)
      return response.data // Return the response data
    }
  } catch (error) {
    console.error('Error creating task:', error)
  }
}
