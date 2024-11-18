import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'
import { GetUserTasks } from '@/functions/Task/GetUserTasks'
import Skeleton from 'react-loading-skeleton'

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

  // Filter tasks for the current month
  const currentMonth = new Date().getMonth()
  const currentMonthTasks = allTasks.filter((task) => {
    const taskMonth = new Date(task.createdAt).getMonth()
    return taskMonth === currentMonth
  })
  const latestTasks = currentMonthTasks.slice(-3) // Get the last 3 tasks

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border-purple-300 border-2">
      {Loading ? (
        <div className="flex items-center justify-center my-10">
          <Skeleton count={3} height={40} />
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-2xl text-[#a078ff] mb-4">
            Recent Tasks
          </h2>
          <div className="mt-4">
            <TaskCard allTasks={latestTasks} />
          </div>
        </>
      )}
    </div>
  )
}

export default RecentTasks
