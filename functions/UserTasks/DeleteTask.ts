// src/utils/api/deleteTask.ts
import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'

export const deleteTaskApi = async (userId: string, taskId: string) => {
  try {
    const response = await axios.delete(
      `${ApiUrl}Api/UserTask/DeleteTask?UserId=${userId}&taskId=${taskId}` // Adjust URL as per your API
    )
    return response.data
  } catch (error) {
    console.log('ERROR HAS OCCURED ', error)
  }
}
