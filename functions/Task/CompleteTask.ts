import axios from 'axios'
import { updateKPI } from '../Kpi/UpdateKpi'

//----------------------------------
// 2️⃣ UPDATE TASK
//----------------------------------
export const completeTask = async (
  taskId: string,
  completed: boolean,
  Userid: string,
  taskname: string,
) => {
  try {
    const response = await axios.put(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/CompleteTask?id=${taskId}`,
      { completed },
    )

    if (response.data) {
      const Data = await updateKPI(Userid, taskname)
      if (Data.success) {
        return Data.success
      }
    }
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}
