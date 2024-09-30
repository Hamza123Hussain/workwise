import axios from 'axios'

// Function to create a task
export const createTask = async (
  id: string,
  Email: string,
  progressupdate: string
) => {
  try {
    const response = await axios.put(
      'https://workwise-backend-five.vercel.app/Api/Task/UpdateTask',
      { id, Email, progressupdate }
    )
    return response.data // Return the response data from the backend
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}
