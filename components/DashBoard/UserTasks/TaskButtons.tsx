import { updateKPI } from '@/functions/Kpi/UpdateKpi'
import { deleteTaskApi } from '@/functions/UserTasks/DeleteTask'
import { TaskCompleted } from '@/functions/UserTasks/TaskCompleted'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import {
  CompleteTask,
  deleteTask,
} from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
const TaskButtons = ({ task }: { task: RoleTask }) => {
  const dispatch = useDispatch()
  const TaskCompletion = async () => {
    if (!task._id || !task.UserId) return
    const taskCompletedResponse = await TaskCompleted(
      !task.Completed, // Toggle the completion status for the API call
      task.TotalPoints,
      task.UserId,
      task._id
    )
    if (taskCompletedResponse) {
      // Dispatch the action with the toggled value
      dispatch(CompleteTask({ _id: task._id, Completed: !task.Completed }))
      const KpiUpdated = await updateKPI(task.UserId, task.TaskName)
      if (KpiUpdated) {
        toast.success('KPI HAS BEEN UPDATED')
      }
    }
  }
  const handleDelete = async () => {
    if (!task._id || !task.UserId) return
    const DeletedTask = await deleteTaskApi(task.UserId, task._id)
    if (DeletedTask) {
      dispatch(deleteTask(task._id))
      toast.success('Task has been deleted.')
    }
  }
  return (
    <div className="w-[20%] flex justify-center gap-3">
      <button
        onClick={() => TaskCompletion()}
        className={`${
          task.Completed ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white p-2 rounded-md`}
      >
        ✅
      </button>
      <button
        onClick={() => handleDelete()}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
      >
        🗑️
      </button>
    </div>
  )
}
export default TaskButtons
