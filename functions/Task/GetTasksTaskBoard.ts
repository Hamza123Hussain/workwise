//----------------------------------
// 3️⃣ GET TASKS GROUPED BY DATE

import axios from 'axios'

//----------------------------------
export const getTasksGroupedByDate = async () => {
  try {
    const response = await axios.get(
      `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/GetAllTasks`,
    )

    return response.data.groupedTasks // returns { "2025-12-27": [...], ... }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}
