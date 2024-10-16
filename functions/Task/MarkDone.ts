import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import { toast } from 'react-hot-toast' // Assuming you use React Hot Toast for notifications

export const markTaskAsDone = async (
  taskId: string,
  userEmail: string,
  progress: string
) => {
  try {
    // Sending a POST request to mark the task as done
    const response = await axios.put(`${ApiUrl}Api/Task/MarkDone`, {
      id: taskId,
      Email: userEmail,
      progress, // e.g., updated progress percentage (0-100)
    })

    // Handle success response
    if (response.status === 200) {
      toast.success('Task progress updated successfully')
      //   console.log('Updated Task:', response.data.task) // Do something with the updated task if needed
      window.location.reload()
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Check if the error is an Axios error and has a response
      if (error.response.status === 404) {
        toast.error(error.response.data.message as string) // User or Task not found
      } else {
        toast.error('An error occurred while updating the task progress')
      }
    } else {
      toast.error('An unexpected error occurred')
    }
    // console.error('Error:', error)
  }
}
