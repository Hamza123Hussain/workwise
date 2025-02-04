import { TaskCompleted } from '@/functions/UserTasks/TaskCompleted'
import { CompleteTask } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const CompleteButton = ({
  Completed,
  TotalPoints,
  UserID,
  TaskId,
}: {
  Completed: boolean
  TotalPoints: number
  UserID: string | undefined
  TaskId: string | undefined
}) => {
  const dispatch = useDispatch()

  const TaskCompletion = async () => {
    if (!TaskId || !UserID) return
    const taskCompletedResponse = await TaskCompleted(
      !Completed, // Toggle the completion status for the API call
      TotalPoints,
      UserID,
      TaskId
    )
    if (taskCompletedResponse) {
      // Dispatch the action with the toggled value
      dispatch(CompleteTask({ _id: TaskId, Completed: !Completed }))
    }
  }

  return (
    <button
      className={`w-full py-3 font-semibold text-lg ${
        Completed
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      disabled={Completed}
      onClick={TaskCompletion}
    >
      {Completed ? 'Completed' : 'Mark as Complete'}
    </button>
  )
}

export default CompleteButton
