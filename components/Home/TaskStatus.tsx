import React, { useEffect, useState } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'
import { GetAllTasks } from '@/functions/Task/AllTasks'
import Loader from '../Loader'
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
  const tasksDone = allTasks.filter((task) => task.progress === 'DONE')
  return (
    <div className="bg-black border-2 border-purple-600 text-white flex-1 p-6 rounded-lg shadow-md">
      {Loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-6">
          <p>
            <strong>Total Tasks Assigned:</strong>{' '}
            <span className="font-bold">{allTasks.length}</span>
          </p>
          <p>
            <strong>Tasks Done:</strong>{' '}
            <span className="font-bold">{tasksDone.length}</span>
          </p>
          <p>
            <strong>Tasks Left:</strong>{' '}
            <span className="font-bold">
              {allTasks.length - tasksDone.length}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
export default TaskStatus
