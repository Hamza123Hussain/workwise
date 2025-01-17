import { deleteTaskApi } from '@/functions/UserTasks/DeleteTask'
import { deleteTask } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const DeleteButton = ({ _id }: { _id: string }) => {
  const User = useSelector((state: RootState) => state.user)
  const Dispatch = useDispatch()
  // Delete Task function (replace this with the actual logic for deleting the task)
  const handleDelete = async () => {
    const DeletedTask = await deleteTaskApi(User._id, _id)
    if (DeletedTask) {
      Dispatch(deleteTask(_id))
      toast.success('Task Has Been Deleted')
    }
  }
  return (
    <div className="mt-4">
      <button
        onClick={handleDelete}
        className="flex items-center text-red-600 hover:text-red-800 font-semibold"
      >
        <FaTrash className="mr-2 text-lg" />
        Delete Task
      </button>
    </div>
  )
}

export default DeleteButton
