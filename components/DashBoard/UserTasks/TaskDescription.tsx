import { UpdateDescription } from '@/functions/UserTasks/UpdateDescription'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React, { useState } from 'react'

const TaskDescription = ({ task }: { task: RoleTask }) => {
  const [description, setDescription] = useState(task.Description || '')
  const UpdateTaskDescription = async () => {
    await UpdateDescription(description, task.UserId, task._id)
  }
  return (
    <div className="flex items-center gap-2 ">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoFocus
        className="border border-[#DADADA] bg-white px-2 py-1 rounded-md w-[90%] text-[13px] text-[#475267] focus:outline-none focus:ring-1 focus:ring-[#B994E6]"
      />
      <button
        onClick={() => UpdateTaskDescription()}
        className="bg-[#1976D2] hover:bg-[#125A9C] text-white p-2 rounded-md"
      >
        ✏️
      </button>
    </div>
  )
}

export default TaskDescription
