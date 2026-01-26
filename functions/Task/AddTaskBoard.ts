import axios from 'axios'

export type TaskPayload = {
  name: string
  description: string
  assignedTo: string
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
  createdBy: string
  email: string
  type?: string
}

//----------------------------------
// 1️⃣ CREATE TASK
//----------------------------------
export const addTask = async (data: TaskPayload) => {
  try {
    const response = await axios.post(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/AddTaskDetails`,
      data,
    )

    return response.data
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}
