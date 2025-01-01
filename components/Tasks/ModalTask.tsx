import React, { useState } from 'react'
import { createTask } from '../../functions/Task/CreateTask'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import TaskForm from './TaskForm'
import toast from 'react-hot-toast'
import { TaskFormProps } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const CreateTaskModal = () => {
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

  const handleSubmit = async () => {
    try {
      const Response = await createTask(taskData)
      if (Response) {
        toast.success('Task has been created successfully')

        Router.push('/usertasks')
        window.location.reload()
      }
    } catch (error) {
      console.log('Error in frontend', error)
      toast.error('Failed to create the task')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" bg-purple-600 p-4 hover:bg-purple-800 cursor-pointer  text-white py-2 rounded-lg">
          Create Task
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl font-bold mb-4 text-purple-500 text-center">
              Create a New Task
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[50vh] pr-4">
          <TaskForm taskData={taskData} setTaskData={setTaskData} />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 p-4 hover:bg-purple-800 cursor-pointer  text-white py-2 rounded-lg"
        >
          Create Task
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskModal
