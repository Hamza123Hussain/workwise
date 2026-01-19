//----------------------------------
// 2️⃣ DELETE TASK BY ID

import axios from 'axios'

//----------------------------------
export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/DeleteTask?id=${id}`,
    )

    return response.data
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}
