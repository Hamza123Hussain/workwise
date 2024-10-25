'use client'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserTasks } from '@/functions/Frontend/UserTasks'
import Empty_Task_Test from '@/components/Tasks/Empty_Task_Test'
import Loader from '@/components/Loader'
import Dropdowns from '@/components/Tasks/Dropdowns'
import { filteredTasks } from '@/functions/Task/Filter_Task'
const UserTasks = () => {
  const [loading, setLoading] = useState(true)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const [timeFilter, setTimeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const user = useSelector((state: RootState) => state.user)
  const selectedUser = useSelector((state: RootState) => state.Select)
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchUserTasks(user.Name, user.Email, setLoading)
      setTasks(tasks)
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [selectedUser, user.Email, user.Name])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div className="p-6 rounded-lg my-10">
      <h2 className="font-semibold text-2xl text-[#8c5bff] mb-4">
        Tasks of {user.Name}
      </h2>
      <Dropdowns
        setTimeFilter={setTimeFilter}
        setStatusFilter={setStatusFilter}
        timeFilter={timeFilter}
        statusFilter={statusFilter}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks(allTasks, timeFilter, statusFilter).length > 0 ? (
          filteredTasks(allTasks, timeFilter, statusFilter).map((task) => (
            <TaskCard2 key={task.createdAt} TaskDetail={task} />
          ))
        ) : (
          <Empty_Task_Test />
        )}
      </div>
    </div>
  )
}
export default UserTasks
