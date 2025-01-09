import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'
import { GetAllTasks } from '../Task/AllTasks'
import { groupByUserData } from '../Attendance/GroupEdAttendance'

export const AllTasks = async (
  UserEmail: string,
  setLoading: (loading: boolean) => void,
  setALL_TASKS: (tasks: { [key: string]: TaskFetch[] }) => void
) => {
  try {
    setLoading(true)
    const Data: TaskFetch[] | null = await GetAllTasks(UserEmail) // Specify expected data type
    console.log('ALL TASKS', Data)
    if (Data) {
      const groupedData = groupByUserData(Data) as {
        [key: string]: TaskFetch[]
      }
      setALL_TASKS(groupedData)
    }
  } catch (error) {
    console.error(`ERROR IN THE FUNCTION: ${error}`)
  } finally {
    setLoading(false)
  }
}
