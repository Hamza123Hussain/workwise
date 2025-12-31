import TaskLoader from '@/components/Task/TaskLoader'
import { getUserTasks } from '@/functions/UserTasks/GetUserTasks'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { setTasks } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taskcard from '../DashBoard/UserTasks/Taskcard'

const Tasks = () => {
  const User = useSelector((state: RootState) => state.user)
  const tasks = useSelector((state: RootState) => state.userTaskSlice.tasks)
  const [Loading, SetLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  // 🔥 Filter tasks for the current month
  const filterTasksForCurrentMonth = (tasks: RoleTask[]) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    return tasks.filter((task) => {
      if (task.DueDate) {
        const due = new Date(task.DueDate)
        // Make sure it's a valid date
        if (isNaN(due.getTime())) return false
        return (
          due.getMonth() === currentMonth && due.getFullYear() === currentYear
        )
      }
    })
  }
  // Fetch User Tasks
  const GetUserTasks = async () => {
    try {
      SetLoading(true)
      const TasksFetched = await getUserTasks(User._id)
      if (TasksFetched) {
        const FilteredTasks = filterTasksForCurrentMonth(TasksFetched)
        dispatch(setTasks(FilteredTasks))
      }
    } finally {
      SetLoading(false)
    }
  }
  useEffect(() => {
    GetUserTasks()
  }, [])
  if (Loading) {
    return <TaskLoader />
  }
  return (
    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
      {tasks.map((task) => (
        <Taskcard task={task} key={task._id} />
      ))}
    </div>
  )
}
export default Tasks
