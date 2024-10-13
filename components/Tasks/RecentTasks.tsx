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
    // Set loading state to true to indicate data fetching is in progress
    SetLoading(true)

    try {
      // Call an asynchronous function to get user tasks using 'user.Name' and 'user.Email'
      const data = await GetUserTasks(user.Name, user.Email)

      // If the data is successfully retrieved (not null or undefined)
      if (data) {
        // Set 'tasks' state with the last 3 items from the fetched data (most recent tasks)
        setTasks(data.slice(-3))

        // Set loading state to false since the data fetching is complete
        SetLoading(false)
      }
    } catch (error) {
      // If an error occurs during the data fetch, set loading state to false
      SetLoading(false)

      // Log the error to the console for debugging purposes
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.Email])

  return (
    <div className=" p-6 rounded-lg shadow-md">
      {Loading ? (
        <div className=" flex items-center justify-center my-10">
          <Loader />
        </div>
      ) : (
        <>
          {' '}
          <h2 className="font-semibold text-2xl text-purple-500">
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
