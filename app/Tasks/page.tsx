import { fetchUserTasks } from '@/functions/UserTasks/GetAllUserTasks'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTasks } from 'react-icons/fa'
import TaskCard from '@/components/Task/Card/TaskCard'

const AllTasks = () => {
  // Get the User ID from Redux state
  const UserID = useSelector((state: RootState) => state.user._id)

  // State variables
  const [allTasks, setAllTasks] = useState<RoleTask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch all tasks
  const getAllTasks = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchUserTasks(UserID)

      if (response.success) {
        setAllTasks(response.data)
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError('An error occurred while fetching tasks.')
      console.log('ERROR HERE : ', error)
    }

    setLoading(false)
  }

  // Fetch tasks when component mounts
  useEffect(() => {
    if (UserID) {
      getAllTasks()
    }
  }, [UserID])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaTasks className="text-indigo-600" />
          All Tasks
        </h1>
        <button
          onClick={getAllTasks}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Loading & Error Handling */}
      {loading && (
        <p className="text-center text-lg text-gray-600">Loading tasks...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Task List */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {allTasks.length > 0 ? (
          allTasks.map((task) => <TaskCard key={task._id} TaskDetails={task} />)
        ) : (
          <p className="text-center text-lg text-gray-700 col-span-full">
            No tasks available. Start by adding a new task!
          </p>
        )}
      </div>
    </div>
  )
}

export default AllTasks
