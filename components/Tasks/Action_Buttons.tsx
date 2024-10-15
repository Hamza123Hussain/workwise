import React from 'react'
import { useRouter } from 'next/navigation'
import { TaskFetch } from '@/utils/TaskformInterface'
import { DeleteTask } from '@/functions/Task/DeleteTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import { createTask } from '@/functions/Task/CreateTask'

const ActionButtons = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const User = useSelector((state: RootState) => state.user)
  const Router = useRouter()
  const isDueDatePast =
    new Date(TaskDetail.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))

  const TaskDelete = async () => {
    try {
      const Delete_Task = await DeleteTask(User.Email, TaskDetail._id)
      if (Delete_Task) {
        toast.success('Task has been deleted')
        window.location.reload()
      }
    } catch (error) {
      console.log(`Unable to delete task: ${error}`)
    }
  }

  const TaskRepeat = async () => {
    // Determine the new due date based on the TaskType
    let newDueDate: string
    const currentDate = new Date()
    if (TaskDetail.TaskType === 'Daliy') {
      newDueDate = currentDate.toISOString().split('T')[0] // Set to current date
    } else if (TaskDetail.TaskType === 'Weekly') {
      currentDate.setDate(currentDate.getDate() + 7) // Add 7 days
      newDueDate = currentDate.toISOString().split('T')[0] // Set to current date + 7 days
    } else {
      // If the TaskType is neither daily nor weekly, handle it accordingly (optional)
      toast.error('Invalid task type')
      return
    }
    // Create the task with the new due date
    try {
      const Repeated_Task = await createTask({
        description: TaskDetail.description,
        dueDate: newDueDate,
        assignedTo: TaskDetail.assignedTo,
        name: TaskDetail.name,
        Email: User.Email,
        priority: TaskDetail.priority,
        TaskType: TaskDetail.TaskType,
      })
      if (Repeated_Task) {
        toast.success('Task has been repeated')
        // Optionally, you could redirect or update UI here
        window.location.reload()
      }
    } catch (error) {
      console.error('Error repeating task:', error)
    }
  }

  return (
    <div className="flex justify-end flex-col sm:flex-row items-center  gap-2 my-5">
      {TaskDetail.TaskType !== 'Other' && (
        <button
          onClick={() => TaskRepeat()} // Repeat Task
          className={`p-2 rounded-lg shadow transition-all duration-200 text-xs ease-in-out 
            ${'bg-green-600 text-white hover:bg-green-700'}`}
        >
          Repeat Task
        </button>
      )}
      <button
        onClick={() =>
          !isDueDatePast && Router.push(`/edittask/${TaskDetail._id}`)
        } // Edit Task
        className={`p-2 rounded-lg shadow transition-all duration-200 text-xs ease-in-out 
          ${
            isDueDatePast
              ? 'bg-blue-400 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        disabled={isDueDatePast} // Disable button if the due date is past
      >
        Edit Task
      </button>
      <button
        onClick={() => !isDueDatePast && TaskDelete()} // Delete Task
        className={`p-2 rounded-lg shadow transition-all duration-200 text-xs ease-in-out 
          ${
            isDueDatePast
              ? 'bg-red-400 text-gray-300 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        disabled={isDueDatePast} // Disable button if the due date is past
      >
        Delete Task
      </button>
    </div>
  )
}

export default ActionButtons
