import axios from 'axios'
import { updateKPI } from '../Kpi/UpdateKpi'

//----------------------------------
// 2️⃣ UPDATE TASK
//----------------------------------
export const updateTaskStatus = async (
  taskId: string,
  status: string,
  UserID: string,
  taskname: string,
) => {
  try {
    const response = await axios.put(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/UpdateTaskStatus?id=${taskId}`,
      { status },
    )

    console.log('UpdateTaskStatus response:', response.data)
    if (response.data && status === 'Completed') {
      const Data = await updateKPI(UserID, taskname)
      if (Data) {
        return true
      }
    }
    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}
