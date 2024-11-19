'use client'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Empty_Task_Test from '@/components/Tasks/Empty_Task_Test'
import Loader from '@/components/Loader'
import { fetchUserTasks } from '@/functions/Frontend/UserTasks'
import { filteredTasks } from '@/functions/Task/Filter_Task'
const TaskPage = () => {
  const [loading, setLoading] = useState(true)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)
  const selectedUser = useSelector((state: RootState) => state.Select)
  const SortTask = useSelector((state: RootState) => state.sort)
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchUserTasks(selectedUser, user.Email, setLoading)
      setTasks(tasks) // Set the fetched tasks
      setLoading(false)
    }
    fetchData() // Call the fetchData function
    return () => {
      fetchData()
    }
  }, [selectedUser, user.Email])
  if (loading)
    return (
      <div className=" flex min-h-screen justify-center items-center">
        <Loader />
      </div>
    )
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks(
          allTasks,
          SortTask.Status,
          SortTask.TimeFrame,
          SortTask.Prirority,
          SortTask.Month
        ).length > 0 && !loading ? (
          filteredTasks(
            allTasks,
            SortTask.Status,
            SortTask.TimeFrame,
            SortTask.Prirority,
            SortTask.Month
          ).map((task) => <TaskCard2 key={task.createdAt} TaskDetail={task} />)
        ) : (
          <Empty_Task_Test />
        )}
      </div>
    </>
  )
}
export default TaskPage
