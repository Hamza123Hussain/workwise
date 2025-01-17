import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'

const Layout = () => {
  const UserTasks = useSelector((state: RootState) => state.userTaskSlice.tasks)
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 ">
      {UserTasks.map((task) => (
        <TaskCard key={task._id} TaskDetails={task} />
      ))}
    </div>
  )
}

export default Layout
