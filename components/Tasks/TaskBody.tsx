// TaskBody.tsx
import {
  priorityClass,
  progress_Class,
  TaskFetch,
} from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import React from 'react'
const TaskBody = ({ task }: { task: TaskFetch }) => {
  const Router = useRouter()

  return (
    <tr key={task.createdAt}>
      <td className="border border-purple-500 p-2">{task.name}</td>
      <td className="border border-purple-500 p-2">{task.assignedTo}</td>
      <td
        className={`border border-purple-500 p-2 text-center ${progress_Class(
          task
        )}`}
      >
        {task.progress}
      </td>
      <td className="border border-purple-500 p-2">{task.description}</td>
      <td className="border border-purple-500 p-2">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
      {/* Priority column with dynamic color based on priority */}
      <td
        className={`border border-purple-500 p-2 text-center ${priorityClass(
          task
        )}`}
      >
        {task.priority}
      </td>
      <td className="border border-purple-500 p-4 flex justify-center">
        <button
          onClick={() => Router.push(`/edittask/${task._id}`)}
          className="bg-gradient-to-t from-black to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white rounded-full p-4 transition-colors"
        >
          Edit Me
        </button>
      </td>
    </tr>
  )
}

export default TaskBody
