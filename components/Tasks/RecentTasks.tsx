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
        setTasks(data.slice(-3))
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
            <TaskCard allTasks={allTasks} />
          </div>
        </>
      )}
    </div>
  )
}

export default RecentTasks
