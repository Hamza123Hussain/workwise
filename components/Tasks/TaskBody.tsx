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
    <tr key={task.createdAt}>
      <td className="border border-purple-500 p-2 text-xs  ">{task.name}</td>
      {/* <td className="border border-purple-500 p-2 text-xs  ">
        {task.assignedTo}
      </td> */}
      <td
        className={`border border-purple-500 p-2 text-center ${progress_Class(
          task
        )} text-transparent bg-<color> bg-clip-text text-xs  `}
      >
        {task.progress}
      </td>
      {/* <td className="border border-purple-500 p-2 text-xs  ">
        {task.description}
      </td> */}
      <td className="border border-purple-500 p-2 text-xs  ">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
      {/* Priority column with dynamic color based on priority */}
      <td
        className={`border border-purple-500 p-2 text-center ${priorityClass(
          task
        )} text-transparent bg-<color> bg-clip-text text-xs  `}
      >
        {task.priority}
      </td>
      <td className="border border-purple-500 p-4 flex justify-center">
        <button
          onClick={() => !isDueDatePast && Router.push(`/edittask/${task._id}`)} // Navigate only if the due date is not past
          className={`bg-gradient-to-t from-black to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg p-2 w-full transition-colors text-xs  
                      ${
                        isDueDatePast ? 'bg-gray-600 cursor-not-allowed ' : ''
                      }`} // Change button style if due date is past
          disabled={isDueDatePast} // Disable button if due date is past
        >
          Edit
        </button>
      </td>
    </tr>
  )
}

export default TaskBody
