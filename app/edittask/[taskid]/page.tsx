'use client'
import Loader from '@/components/Loader'
import { GetSingleTask } from '@/functions/Task/GetSingleTask'
import { updateTask } from '@/functions/Task/UpdateTask'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const TaskEdit = ({ params }: { params: { taskid: string } }) => {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState<TaskFetch | null>(null)
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW')
  const [progress, setProgress] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>(
    'TODO'
  )
  const user = useSelector((state: RootState) => state.user)
  const Router = useRouter()
  const getASingleTask = async () => {
    setLoading(true)
    try {
      const getTask = await GetSingleTask(user.Email, params.taskid)
      if (getTask) {
        setTask(getTask)
        setDescription(getTask.description)
        setPriority(getTask.priority)
        setProgress(getTask.progress)
      }
    } catch (error) {
      toast.error(`There is an error in getting task: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTask = async () => {
    const UpdateTask = await updateTask(
      params.taskid,
      user.Email,
      progress,
      description,
      priority
    )
    if (UpdateTask) {
      Router.push('/usertasks')
    }
    toast.success('Task updated successfully!') // Replace with actual feedback after updating
  }

  useEffect(() => {
    getASingleTask()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-purple-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold">Task Details</h1>
          <h2 className="text-2xl font-bold">{task?.name}</h2>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Progress</h2>
          <select
            value={progress}
            onChange={(e) =>
              setProgress(e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE')
            }
            className="bg-purple-700 text-white p-2 rounded w-full"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Priority</h2>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')
            }
            className="bg-purple-700 text-white p-2 rounded w-full"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-purple-700 text-white p-2 rounded w-full h-24"
          />
        </div>
        <button
          onClick={handleUpdateTask}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Update Task
        </button>
      </div>
    </div>
  )
}

export default TaskEdit
