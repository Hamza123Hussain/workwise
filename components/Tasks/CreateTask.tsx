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
  // State to manage task data
  const [taskData, setTaskData] = useState<TaskFormProps>({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    Email: User.Email, // Populate from Redux state
    priority: 'LOW',
    TaskType: 'Daliy',
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
    <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full mx-auto my-5">
      <h1 className="text-2xl font-bold mb-6 text-purple-400 text-center">
        Create a New Task
      </h1>
      <form onSubmit={handleSubmit}>
        <TaskForm taskData={taskData} setTaskData={setTaskData} />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg shadow hover:bg-purple-500 transition duration-300"
        >
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTaskForm
