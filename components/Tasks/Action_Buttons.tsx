import React, { useState } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'
import { DeleteTask } from '@/functions/Task/DeleteTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import { createTask } from '@/functions/Task/CreateTask'
import EditTaskModal from './EditTaskModal'
import { useRouter } from 'next/navigation'
import { GoPencil } from 'react-icons/go'
import { TbTrashX } from 'react-icons/tb'
import { FaRepeat } from 'react-icons/fa6'
import { MdDoneOutline } from 'react-icons/md'
import { MarkAsDone } from '@/functions/Task/MarkDone'
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
    <div className="flex items-center justify-evenly rounded-lg bg-white w-full">
      {TaskDetail.TaskType !== 'Other' && (
        <button
          onClick={() => TaskRepeat()} // Repeat Task
          className={`p-2 rounded-lg  transition-all duration-200 text-[8px] ease-in-out 
            ${'text-white'}`}
        >
          <FaRepeat size={20} className="text-green-500" fill="green" />
        </button>
      )}
      <button
        onClick={() => {
          Router.push(`/edittask/${TaskDetail._id}`)
        }} // Open Edit Task Modal
        className={`p-2 rounded-lg transition-all duration-200 text-[8px] ease-in-out 
          ${
            isDueDatePast ? ' text-gray-300 cursor-not-allowed' : ' text-white'
          }`}
        disabled={isDueDatePast}
      >
        <GoPencil size={20} className="text-blue-500" fill="blue" />
      </button>
      <button
        onClick={() => !isDueDatePast && TaskDelete()} // Delete Task
        className={`p-2 rounded-lg  transition-all duration-200 text-[8px] ease-in-out 
          ${
            isDueDatePast ? ' text-gray-300 cursor-not-allowed' : 'text-white'
          }`}
        disabled={isDueDatePast}
      >
        <TbTrashX size={20} className=" text-red-600" fill="red" />
      </button>
      <button
        onClick={() =>
          MarkAsDone(
            TaskDetail._id,
            User.Email,
            'DONE',
            TaskDetail.description,
            TaskDetail.priority,
            TaskDetail.name,
            TaskDetail.dueDate
          )
        }
        className={`py-2 px-4 rounded-md text-white text-xs font-semibold transition-all duration-300 
            ${
              new Date(TaskDetail.dueDate) <
                new Date(new Date().setHours(0, 0, 0, 0)) ||
              TaskDetail.progress === 'DONE'
                ? '  text-green-600 cursor-not-allowed'
                : 'text-gray-100'
            }`}
        disabled={
          new Date(TaskDetail.dueDate) <
          new Date(new Date().setHours(0, 0, 0, 0))
        }
      >
        <MdDoneOutline
          size={20}
          fill={
            new Date(TaskDetail.dueDate) <
              new Date(new Date().setHours(0, 0, 0, 0)) ||
            TaskDetail.progress === 'DONE'
              ? 'black'
              : 'green'
          }
        />
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
