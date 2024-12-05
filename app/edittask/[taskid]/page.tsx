'use client'
import Loader from '@/components/Loader'
import EditTaskBody from '@/components/Tasks/EditTaskBody'
import { getASingleTask } from '@/functions/Frontend/SingleTask'
import { handleUpdateTask } from '@/functions/Frontend/UpdateTask'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const TaskEdit = ({ params }: { params: { taskid: string } }) => {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState<TaskFetch>()
  const [taskname, setTaskName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<string>('LOW')
  const [progress, setProgress] = useState<string>('TODO')
  const user = useSelector((state: RootState) => state.user)
  const Router = useRouter()
  useEffect(() => {
    getASingleTask(
      setLoading,
      user.Email,
      params.taskid,
      setTask,
      setDescription,
      setProgress,
      setPriority,
      setTaskName
    )
  }, [params.taskid, user.Email])
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-[#8D6ED9] text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {task && (
          <EditTaskBody
            task={task}
            progress={progress}
            taskname={taskname}
            setTaskName={setTaskName}
            setProgress={setProgress}
            priority={priority}
            setPriority={setPriority}
            description={description}
            setDescription={setDescription}
            Email={user.Email}
          />
        )}
        <button
          onClick={() =>
            task &&
            handleUpdateTask(
              task,
              params.taskid,
              user.Email,
              progress,
              description,
              priority,
              Router,
              taskname
            )
          }
          className="w-full bg-white border-2 hover:border-black text-[#a56edd] font-bold py-2 px-4 rounded transition duration-200"
        >
          Update Task
        </button>
      </div>
    </div>
  )
}
export default TaskEdit
