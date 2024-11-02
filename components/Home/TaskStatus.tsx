import React, { useEffect, useState } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import TaskOverview from './TaskOverview'
import { GetUserTasks } from '@/functions/Task/GetUserTasks'

const TaskStatus = () => {
  const [loading, setLoading] = useState(false)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await GetUserTasks(user.Name, user.Email)
      if (data) {
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
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

  return (
    <div className="border-2 border-purple-600 text-white flex-1 p-4 rounded-lg shadow-lg">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="text-black">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#a078ff]">
            Task Progress Overview
          </h2>
          <TaskOverview allTasks={currentMonthTasks} />{' '}
          {/* Pass filtered tasks */}
        </div>
      )}
    </div>
  )
}

export default TaskStatus
