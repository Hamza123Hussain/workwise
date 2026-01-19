import axios from 'axios'

//----------------------------------
// 2️⃣ UPDATE TASK
//----------------------------------
export const completeTask = async (taskId: string, completed: boolean) => {
  try {
    const response = await axios.put(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/CompleteTask?id=${taskId}`,
      { completed },
    )

    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}
