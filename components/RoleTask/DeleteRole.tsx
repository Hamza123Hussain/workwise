'use client'
import { UpdateRoleTasks } from '@/functions/Roles/UpdateRoletask'
interface DeleteConfirmProps {
  TaskID: string
  RoleTasksId: string
  userId: string
  onDeleted: any
}

export default function DeleteConfirm({
  RoleTasksId,
  userId,
  TaskID,
  onDeleted,
}: DeleteConfirmProps) {
  // Example function call inside DeleteConfirm
  const handleDeleteTask = async () => {
    if (confirm('Delete this task?')) {
      await UpdateRoleTasks(RoleTasksId, userId, { RemoveTaskId: TaskID })
      onDeleted()
    }
  }

  return (
    <button
      onClick={handleDeleteTask}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  )
}
