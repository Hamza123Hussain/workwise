'use client'
import { UpdateRoleTasks } from '@/functions/Roles/UpdateRoletask'
interface DeleteConfirmProps {
  TaskID: string
  RoleTasksId: string
  userId: string
}

export default function DeleteConfirm({
  RoleTasksId,
  userId,
  TaskID,
}: DeleteConfirmProps) {
  // Example function call inside DeleteConfirm
  const handleDeleteTask = async () => {
    if (confirm('Delete this task?')) {
      await UpdateRoleTasks(RoleTasksId, userId, { RemoveTaskId: TaskID })
      // trigger refresh
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
