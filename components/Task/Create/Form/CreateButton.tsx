import { createTask } from '@/functions/UserTasks/CreateUserTask'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'
import toast from 'react-hot-toast'

const CreateButton = ({ FormData }: { FormData: RoleTask }) => {
  const TaskCreation = async () => {
    const TaskCreated = await createTask(FormData)
    if (TaskCreated) toast.success('Task Has Been Created Successfully')
  }
  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={TaskCreation}
        className="rounded bg-blue-600 px-4 py-2 text-white shadow-md transition-transform hover:scale-105 focus:outline-none"
      >
        Create A Task
      </button>
    </div>
  )
}

export default CreateButton
