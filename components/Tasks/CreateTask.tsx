import React, { useState } from 'react'
import { createTask } from '../../functions/Task/CreateTask'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import TaskForm from './TaskForm'
import toast from 'react-hot-toast'
import { TaskFormProps } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'

const CreateTaskForm = () => {
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
        Router.push('/usertasks')
      }
    } catch (error) {
      console.log('Error in frontend', error)
      toast.error('Failed to create the task')
    }
  }

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-2xl shadow-xl max-w-lg w-full mx-auto my-14 sm:my-8 border-2 border-[#be8bff]">
      <h1 className="text-3xl font-extrabold text-center text-purple-500 mb-8">
        Create a New Task
      </h1>
      <form onSubmit={handleSubmit}>
        <TaskForm taskData={taskData} setTaskData={setTaskData} />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:from-purple-500 hover:to-indigo-500 transition duration-300 ease-in-out"
        >
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTaskForm
