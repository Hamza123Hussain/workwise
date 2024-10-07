'use client'
import Loader from '@/components/Loader'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { GetUserTasks } from '@/functions/Task/GetUserTasks'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserTasks = () => {
  const [Loading, SetLoading] = useState(false)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const User = useSelector((state: RootState) => state.user)

  const fetchData = async () => {
    SetLoading(true)
    try {
      const data = await GetUserTasks(User.Name, User.Email)
      if (data) {
        // Sort tasks in descending order based on createdAt
        const sortedTasks = data.sort(
          (a: TaskFetch, b: TaskFetch) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setTasks(sortedTasks)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      SetLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [User.Email])

  if (Loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-purple-500">
        Tasks of {User.Name}
      </h2>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-2 mx-auto">
        {allTasks.length > 0 ? (
          allTasks.map((task) => (
            <TaskCard2 key={task.createdAt} TaskDetail={task} />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  )
}

export default UserTasks
