'use client'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Empty_Task_Test from '@/components/Tasks/Empty_Task_Test'
import Loader from '@/components/Loader'
import { fetchUserTasks } from '@/functions/Frontend/UserTasks'
const TaskPage = () => {
  const [loading, setLoading] = useState(true)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)
  const selectedUser = useSelector((state: RootState) => state.Select)
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
    <div className=" my-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allTasks.length > 0 && !loading ? (
          allTasks.map((task) => (
            <TaskCard2 key={task.createdAt} TaskDetail={task} />
          ))
        ) : (
          <Empty_Task_Test />
        )}
      </div>
    </div>
  )
}
export default TaskPage
