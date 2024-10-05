import React, { useEffect, useState } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'
import { GetAllTasks } from '@/functions/Task/AllTasks'
import Loader from '../Loader'
import TaskOverview from './TaskOverview'

const TaskStatus = () => {
  const [Loading, SetLoading] = useState(false)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)

  const fetchData = async () => {
    SetLoading(true)
    try {
      const data = await GetAllTasks(user.Email)
      if (data) {
        setTasks(data)
        SetLoading(false)
      }
    } catch (error) {
      SetLoading(false)
      console.error('Error fetching tasks:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [user.Email])

  return (
    <div className=" border-2 border-purple-600 text-white flex-1 p-8 rounded-lg shadow-lg">
      {Loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Task Progress Overview</h2>
          <TaskOverview allTasks={allTasks} />
        </div>
      )}
    </div>
  )
}

export default TaskStatus
