// TaskBody.tsx
import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'

const TaskBody = ({ task }: { task: TaskFetch }) => {
  // Apply different background colors based on task priority
  const priorityClass =
    task.priority === 'HIGH'
      ? 'bg-red-600'
      : task.priority === 'MEDIUM'
      ? 'bg-yellow-600'
      : 'bg-green-600'
  const progress_Class =
    task.progress === 'TODO'
      ? 'bg-red-600'
      : task.progress === 'IN_PROGRESS'
      ? 'bg-yellow-600'
      : 'bg-green-600'

  return (
    <tr key={task.createdAt}>
      <td className="border border-purple-500 p-2">{task.name}</td>
      <td className="border border-purple-500 p-2">{task.assignedTo}</td>
      <td
        className={`border border-purple-500 p-2 text-center ${progress_Class}`}
      >
        {task.progress}
      </td>
      <td className="border border-purple-500 p-2">{task.description}</td>
      <td className="border border-purple-500 p-2">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
      {/* Priority column with dynamic color based on priority */}
      <td
        className={`border border-purple-500 p-2 text-center ${priorityClass}`}
      >
        {task.priority}
      </td>
      <td className="border border-purple-500 p-4 flex justify-center">
        <button className="bg-gradient-to-t from-black to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white rounded-full p-4 transition-colors">
          Edit Me
        </button>
      </td>
    </tr>
  )
}

export default TaskBody
