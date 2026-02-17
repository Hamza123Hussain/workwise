'use client'
import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({
  tasks,
  onEdit,
  onUpdateStatus,
  onUpdatePosting,
}: {
  tasks: any[]
  onEdit: (task: any) => void
  onDelete: (task: any) => void
  onUpdateStatus: (task: any, status: string) => void
  onUpdatePosting?: (task: any, platform: string, status: boolean) => void
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            simpleTask={task}
            onEdit={() => onEdit(task)}
            onUpdateStatus={(status) => onUpdateStatus(task, status)}
            onUpdatePosting={(platform, status) =>
              onUpdatePosting && onUpdatePosting(task, platform, status)
            }
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No tasks today.</p>
      )}
    </div>
  )
}

export default TaskList
