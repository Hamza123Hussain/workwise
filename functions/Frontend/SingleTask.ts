import toast from 'react-hot-toast'
import { GetSingleTask } from '../Task/GetSingleTask'
import { TaskFetch } from '@/utils/TaskformInterface'
// Function to fetch a single task based on the task ID
export const getASingleTask = async (
  setLoading: (loading: boolean) => void,
  Email: string,
  taskid: string,
  setTask: (task: TaskFetch) => void,
  setDescription: (description: string) => void,
  setProgress: (progress: string) => void,
  setPriority: (prirority: string) => void
) => {
  setLoading(true)
  try {
    const getTask = await GetSingleTask(Email, taskid)
    if (getTask) {
      setTask(getTask)
      setDescription(getTask.description)
      setPriority(getTask.priority)
      setProgress(getTask.progress)
    }
  } catch (error) {
    toast.error(`There is an error in getting task: ${error}`)
  } finally {
    setLoading(false)
  }
}
