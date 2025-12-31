'use client'

import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks }: { tasks: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task._id} simpleTask={task} />)
      ) : (
        <p className="text-gray-500 col-span-full">No tasks today.</p>
      )}
    </div>
  )
}

export default TaskList
