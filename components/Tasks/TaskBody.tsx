import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
const TaskBody = ({ task }: { task: TaskFetch }) => {
  return (
    <tr key={task.createdAt} className="hover:bg-purple-700">
      <td className="border border-purple-500 p-2">{task.name}</td>
      <td className="border border-purple-500 p-2">{task.assignedTo}</td>
      <td className="border border-purple-500 p-2">{task.progress}</td>
      <td className="border border-purple-500 p-2">{task.description}</td>
      <td className="border border-purple-500 p-2">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
      <td className="border border-purple-500 p-2">{task.priority}</td>
      <td className="border border-purple-500 p-4 flex justify-center">
        <button className="bg-gradient-to-t from-black to-purple-600 rounded-full p-4">
          Edit Me
        </button>
      </td>
    </tr>
  )
}
export default TaskBody
