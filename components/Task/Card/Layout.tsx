import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
const Layout = () => {
  const [LoadMore, SetLoadMore] = useState(6)
  const UserTasks = useSelector((state: RootState) => state.userTaskSlice.tasks)
  const Filters = useSelector((state: RootState) => state.sort)
  const [FilteredTasks, SetFilteredTasks] = useState<RoleTask[]>([])
  useEffect(() => {
    let filtered = [...UserTasks]
    if (Filters.PriorityFlag) {
      filtered = filtered.filter((task) => task.Priority === Filters.Priority)
    }
    if (Filters.YearFlag) {
      filtered = filtered.filter((task) => {
        if (!task.createdAt) return false
        return new Date(task.createdAt).getFullYear() === Filters.Year
      })
    }
    if (Filters.MonthFlag) {
      filtered = filtered.filter((task) => {
        if (!task.createdAt) return false
        return new Date(task.createdAt).getMonth() === Filters.Month
      })
    }
    SetFilteredTasks(filtered)
  }, [Filters, UserTasks])
  const canLoadMore = LoadMore < FilteredTasks.length
  const canLoadLess = LoadMore > 20
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2">
        {FilteredTasks.length > 0 ? (
          FilteredTasks.slice(0, LoadMore).map((task) => (
            <TaskCard key={task._id} TaskDetails={task} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-[50vh]">
            <h1 className="text-lg text-center text-gray-600 font-semibold">
              No tasks have been created.
            </h1>
          </div>
        )}
      </div>
      {/* Buttons */}
      {FilteredTasks.length > 20 && (
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => SetLoadMore((prev) => prev + 10)}
            disabled={!canLoadMore}
            className={`px-6 py-2 rounded-lg transition font-medium ${
              canLoadMore
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Load More
          </button>
          <button
            onClick={() => SetLoadMore((prev) => Math.max(20, prev - 10))}
            disabled={!canLoadLess}
            className={`px-6 py-2 rounded-lg transition font-medium ${
              canLoadLess
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Load Less
          </button>
        </div>
      )}
    </div>
  )
}
export default Layout
