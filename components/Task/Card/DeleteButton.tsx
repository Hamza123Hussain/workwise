import { deleteTaskApi } from '@/functions/UserTasks/DeleteTask'
import { deleteTask } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const DeleteButton = ({ _id }: { _id: string }) => {
  const User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    const DeletedTask = await deleteTaskApi(User._id, _id)
    if (DeletedTask) {
      dispatch(deleteTask(_id))
      toast.success('Task has been deleted.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="flex items-center p-3 text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
    >
      <FaTrash className="mr-2 text-lg" />
      Delete Task
    </button>
  )
}

export default DeleteButton
