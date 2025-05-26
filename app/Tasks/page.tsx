'use client'
import { fetchUserTasks } from '@/functions/UserTasks/GetAllUserTasks'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTasks } from 'react-icons/fa'
import TaskCard from '@/components/Task/Card/TaskCard'
const AllTasks = () => {
  const UserID = useSelector((state: RootState) => state.user._id)
  const [allTasks, setAllTasks] = useState<RoleTask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(4)
  useEffect(() => {
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
        console.error('ERROR:', error)
        setError('An error occurred while fetching tasks.')
      } finally {
        setLoading(false)
      }
    }
    if (UserID) {
      getAllTasks()
    }
  }, [UserID])
  const canLoadMore = visibleCount < allTasks.length
  const canLoadLess = visibleCount > 4
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaTasks className="text-indigo-600" />
          All Tasks
        </h1>
      </div>
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <span className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></span>
        </div>
      )}
      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-semibold py-4">{error}</p>
      )}
      {/* Task Cards */}
      {!loading && !error && allTasks.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
            {allTasks.slice(0, visibleCount).map((task) => (
              <TaskCard key={task._id} TaskDetails={task} />
            ))}
          </div>
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              disabled={!canLoadMore}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                canLoadMore
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Load More
            </button>
            <button
              onClick={() => setVisibleCount((prev) => Math.max(4, prev - 4))}
              disabled={!canLoadLess}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                canLoadLess
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Load Less
            </button>
          </div>
        </>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-lg text-gray-600 mt-12">
            No tasks have been created yet.
          </p>
        )
      )}
    </div>
  )
}
export default AllTasks
