import axios from 'axios'
//----------------------------------
// 1️⃣ CREATE TASK
//----------------------------------
export const addTask = async (
  description: string,
  createdBy: string,
  email: string
) => {
  try {
    const response = await axios.post(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/AddTaskDetails`,
      {
        description,
        createdBy,
        email,
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}
