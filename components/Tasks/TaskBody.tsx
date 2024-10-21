import {
  priorityClass,
  progress_Class,
  TaskFetch,
} from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import React from 'react'

const TaskBody = ({ task }: { task: TaskFetch }) => {
  const Router = useRouter()

  // Check if the due date is past
  const isDueDatePast =
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))

  return (
    <tr key={task.createdAt} className="bg-white hover:bg-gray-100">
      <td className="border border-gray-300 p-2 text-xs text-gray-800">
        {task.name}
      </td>
      <td
        className={`border border-gray-300 p-2 text-center ${progress_Class(
          task
        )} text-gray-950 font-bold`}
      >
        {task.progress}
      </td>
      <td className="border border-gray-300 p-2 text-xs text-gray-800">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
      <td
        className={`border border-gray-300 p-2 text-center ${priorityClass(
          task
        )} text-xs text-gray-950 font-bold`}
      >
        {task.priority}
      </td>
      <td className="border border-gray-300 p-4 flex justify-center">
        <button
          onClick={() => !isDueDatePast && Router.push(`/edittask/${task._id}`)}
          className={`bg-gradient-to-t from-[#5B3F9D] to-[#6D5B9D] hover:from-purple-700 hover:to-purple-800 text-white rounded-lg p-2 w-full transition-colors text-xs ${
            isDueDatePast ? 'bg-gray-300 cursor-not-allowed' : ''
          }`}
          disabled={isDueDatePast}
        >
          Edit
        </button>
      </td>
    </tr>
  )
}

export default TaskBody
