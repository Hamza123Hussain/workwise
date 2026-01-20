import axios from 'axios'

//----------------------------------
// 2️⃣ UPDATE TASK
//----------------------------------
export const updateTaskStatus = async (taskId: string, status: string) => {
  try {
    const response = await axios.put(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/UpdateTaskStatus?id=${taskId}`,
      { status },
    )
    console.log('UpdateTaskStatus response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}
