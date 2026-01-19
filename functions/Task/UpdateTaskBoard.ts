import axios from 'axios'

export type UpdateTaskPayload = {
  name?: string
  description?: string
  assignedTo?: string
  priority?: any
  dueDate?: string
}

//----------------------------------
// 2️⃣ UPDATE TASK
//----------------------------------
export const updateTask = async (taskId: string, data: UpdateTaskPayload) => {
  try {
    const response = await axios.put(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/UpdateTask?id=${taskId}`,
      data,
    )

    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}
