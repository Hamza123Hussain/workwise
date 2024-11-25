import toast from 'react-hot-toast'
import { updateTask } from '../Task/UpdateTask'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'

// Function to handle task update
export const handleUpdateTask = async (
  task: TaskFetch,
  taskid: string,
  Email: string,
  progress: string,
  description: string,
  priority: string,

  Router: ReturnType<typeof useRouter>, // Add Router as a parameter
  taskname: string
) => {
  if (!task) return // Prevent updating if the task is not loaded

  // Check if the due date is today or in the future
  const currentDate = new Date()
  const dueDateObj = new Date(task.dueDate)

  // Resetting hours, minutes, seconds, and milliseconds for accurate comparison
  currentDate.setHours(0, 0, 0, 0)
  dueDateObj.setHours(0, 0, 0, 0)

  if (dueDateObj < currentDate) {
    toast.error('You cannot update this task because the due date has passed.')
    return // Prevent update if due date is past
  }

  try {
    const UpdateTask = await updateTask(
      taskid,
      Email,
      progress,
      description,
      priority,
      taskname,
      task.dueDate
    )
    if (UpdateTask) {
      toast.success('Task updated successfully!')
      Router.push('/usertasks') // Use Router for navigation
    }
  } catch (error) {
    toast.error(`Error updating task: ${error}`)
  }
}
