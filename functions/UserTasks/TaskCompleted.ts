import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'
export const TaskCompleted = async (
  Completed: boolean,
  TotalPoints: number,
  UserId: string | undefined,
  TaskId: string | undefined
) => {
  const Response = await axios.put(
    `${ApiUrl}Api/RoleTask/UpdateCompletion?UserId=${UserId}&TaskId=${TaskId}`,
    { Completed, TotalPoints }
  )
  if (Response.status === 200) {
    toast.success(Response.data.message)
    return true
  }
  try {
  } catch (error) {
    console.error(` SOME ERROR HAS OCCURED: ${error}`)
  }
}
