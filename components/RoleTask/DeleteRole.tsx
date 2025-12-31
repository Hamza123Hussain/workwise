'use client'
import { DeleteRoleTasks } from '@/functions/Roles/DeleteRoleTask'
import toast from 'react-hot-toast'

interface DeleteConfirmProps {
  RoleTasksId: string
  userId: string
}

export default function DeleteConfirm({
  RoleTasksId,
  userId,
}: DeleteConfirmProps) {
  const handleDelete = async () => {
    const response = await DeleteRoleTasks(RoleTasksId, userId)
    if (response) toast.success('Role has been deleted')
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  )
}
