import axios from 'axios'
export const GetSingleTask = async (email: string, taskId: string) => {
  try {
    const response = await axios.get(
      `https://workwise-backend-puce.vercel.app/Api/Task/singleTask?`,
      {
        params: { Email: email, taskId }, // Use params to send query parameters
      }
    )
    return response.data.task
  } catch (err) {
    // Use 'any' or a specific error type for TypeScript
    console.error('Error fetching task:', err)
  }
}
