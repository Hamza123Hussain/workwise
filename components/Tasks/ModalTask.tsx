import React, { useState } from 'react'
import { createTask } from '../../functions/Task/CreateTask'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import TaskForm from './TaskForm'
import toast from 'react-hot-toast'
import { TaskFormProps } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
}
const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const User = useSelector((state: RootState) => state.user)
  const Router = useRouter()
  const [taskData, setTaskData] = useState<TaskFormProps>({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: User.Name,
    Email: User.Email,
    priority: 'LOW',
    TaskType: 'Daily',
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const Response = await createTask(taskData)
      if (Response) {
        toast.success('Task has been created successfully')
        onClose()
        Router.push('/usertasks')
        window.location.reload()
      }
    } catch (error) {
      console.log('Error in frontend', error)
      toast.error('Failed to create the task')
    }
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-lg w-full mx-4 border border-[#bea2ff] z-50 transition-transform transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h1 className="text-2xl font-bold mb-4 text-purple-500 text-center">
          Create a New Task
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-h-[60vh] overflow-y-auto pr-4"
        >
          {/* Added pr-4 for padding */}
          <TaskForm taskData={taskData} setTaskData={setTaskData} />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg shadow hover:from-purple-500 hover:to-indigo-500 transition duration-300 mt-4"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  )
}
export default CreateTaskModal
