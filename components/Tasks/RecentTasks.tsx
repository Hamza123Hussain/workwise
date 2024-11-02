import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'
import Loader from '../Loader'
import { GetUserTasks } from '@/functions/Task/GetUserTasks'

const RecentTasks = () => {
  const [Loading, SetLoading] = useState(false)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)

  const fetchData = async () => {
    SetLoading(true)
    try {
      const data = await GetUserTasks(user.Name, user.Email)
      if (data) {
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      SetLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.Email])

  // Get the current month (0 = January, 1 = February, ..., 11 = December)
  const currentMonth = new Date().getMonth()

  // Filter tasks for the current month
  const currentMonthTasks = allTasks.filter((task) => {
    const taskMonth = new Date(task.createdAt).getMonth()
    return taskMonth === currentMonth
  })

  // Get the latest 3 tasks for the current month
  const latestTasks = currentMonthTasks.slice(-3) // Get the last 3 tasks

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border-purple-300 border-2">
      {Loading ? (
        <div className="flex items-center justify-center my-10">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-2xl text-[#a078ff] ">
            Recent Tasks
          </h2>
          <div className="mt-4 overflow-x-auto">
            <TaskCard allTasks={latestTasks} /> {/* Pass the latest 3 tasks */}
          </div>
        </>
      )}
    </div>
  )
}

export default RecentTasks
