import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
const Layout = () => {
  const UserTasks = useSelector((state: RootState) => state.userTaskSlice.tasks)
  const Filters = useSelector((state: RootState) => state.sort)
  const [FilteredTasks, SetFilteredTasks] = useState<RoleTask[]>([])
  useEffect(() => {
    let filtered = [...UserTasks] // Start with all tasks
    // Apply priority filter
    if (Filters.PriorityFlag) {
      filtered = filtered.filter((task) => task.Priority === Filters.Priority) // Ensure correct property name
    }
    // Apply year filter
    if (Filters.YearFlag) {
      filtered = filtered.filter((task) => {
        if (!task.createdAt) return false // Skip tasks without a valid date
        return new Date(task.createdAt).getFullYear() === Filters.Year
      })
    }
    // Apply month filter
    if (Filters.MonthFlag) {
      filtered = filtered.filter((task) => {
        if (!task.createdAt) return false // Skip tasks without a valid date
        return new Date(task.createdAt).getMonth() === Filters.Month
      })
    }
    // Set the final filtered tasks
    SetFilteredTasks(filtered)
  }, [Filters, UserTasks])
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {FilteredTasks.length > 0 ? (
        FilteredTasks.map((task) => (
          <TaskCard key={task._id} TaskDetails={task} />
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center h-[50vh]">
          <h1 className="text-lg text-center text-black font-semibold">
            NO TASKS HAVE BEEN CREATED
          </h1>
        </div>
      )}
    </div>
  )
}
export default Layout
