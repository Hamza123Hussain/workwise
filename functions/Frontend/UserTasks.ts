import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'
import { GetUserTasks } from '../Task/GetUserTasks'

export const fetchUserTasks = async (
  userName: string,
  email: string,
  setLoading: (loading: boolean) => void
): Promise<TaskFetch[]> => {
  setLoading(true)
  try {
    let sortedTasks = await GetUserTasks(userName, email)
    if (sortedTasks) {
      sortedTasks = sortedTasks.sort(
        (a: TaskFetch, b: TaskFetch) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      return sortedTasks
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
  } finally {
    setLoading(false)
  }
  return [] // Return an empty array in case of an error
}
