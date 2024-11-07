import React, { useState } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'
import { DeleteTask } from '@/functions/Task/DeleteTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import { createTask } from '@/functions/Task/CreateTask'
import EditTaskModal from './EditTaskModal'
import { useRouter } from 'next/navigation'

const ActionButtons = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const Router = useRouter()
  const User = useSelector((state: RootState) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false) // State to manage modal visibility
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
    let newDueDate: string
    const currentDate = new Date()
    if (TaskDetail.TaskType === 'Daily') {
      newDueDate = currentDate.toISOString().split('T')[0]
    } else if (TaskDetail.TaskType === 'Weekly') {
      currentDate.setDate(currentDate.getDate() + 7)
      newDueDate = currentDate.toISOString().split('T')[0]
    } else {
      toast.error('Invalid task type')
      return
    }
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
        window.location.reload()
      }
    } catch (error) {
      console.error('Error repeating task:', error)
    }
  }
  const handleUpdateTask = (updatedTask: TaskFetch) => {
    // Handle the updated task here (e.g., make an API call to save changes)
    console.log(updatedTask)
    // After updating, you can close the modal
    setIsModalOpen(false)
    // Optionally refresh the task list or handle the updated task in your state
  }
  return (
    <div className="flex justify-end flex-col sm:flex-row items-center gap-2 my-5">
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
        onClick={() => {
          Router.push(`/edittask/${TaskDetail._id}`)
        }} // Open Edit Task Modal
        className={`p-2 rounded-lg shadow transition-all duration-200 text-xs ease-in-out 
          ${
            isDueDatePast
              ? 'bg-blue-400 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        disabled={isDueDatePast}
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
        disabled={isDueDatePast}
      >
        Delete Task
      </button>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={TaskDetail}
        onUpdate={handleUpdateTask}
      />
    </div>
  )
}
export default ActionButtons
