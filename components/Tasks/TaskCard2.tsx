import { priorityClass, TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import Action_Buttons from './Action_Buttons'
import { markTaskAsDone } from '@/functions/Task/MarkDone'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
const progress_Class = (task: TaskFetch) => {
  return task.progress === 'TODO'
    ? 'bg-red-600'
    : task.progress === 'IN_PROGRESS'
    ? 'bg-purple-900'
    : task.progress === 'Minor_progress'
    ? 'bg-yellow-500'
    : 'bg-green-600'
}
const TaskCard2 = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="bg-[#a57eff] text-white rounded-2xl border-purple-900 hover:border-2  p-6 w-full md:w-[78%]  mx-auto my-4 transition-transform duration-300 hover:scale-105">
      <div className="border-b border-gray-600 mb-2">
        <h2 className="text-xl font-bold">{TaskDetail.name}</h2>
      </div>
      <div className="mb-4">
        <div className="flex flex-col items-center justify-between">
          <span className="font-medium">Assigned to</span>
          <span className="font-bold">{TaskDetail.assignedTo}</span>
        </div>
        <div className="flex flex-col items-center justify-between mt-2">
          <span className="font-medium">Created at</span>
          <span className="font-bold">
            {new Date(TaskDetail.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-between mt-2">
          <span className="font-medium">Due date</span>
          <span className="font-bold">
            {new Date(TaskDetail.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mb-4">
        <div className="flex flex-col items-center ">
          <span className="font-medium">Priority</span>
          <span
            className={`ml-2 font-bold ${priorityClass(
              TaskDetail
            )} text-transparent bg-clip-text`}
          >
            {TaskDetail.priority}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Progress</span>
          <span
            className={`ml-2 font-bold ${progress_Class(
              TaskDetail
            )} text-transparent bg-clip-text`}
          >
            {TaskDetail.progress}
          </span>
        </div>
      </div>
      <div className="my-2 h-36 overflow-auto">
        <h1 className="text-lg font-semibold">Description</h1>
        <p className="text-sm text-gray-300">{TaskDetail.description}</p>
      </div>
      <button
        onClick={() => markTaskAsDone(TaskDetail._id, user.Email, 'DONE')}
        className={`font-semibold py-2 px-4 rounded transition-colors duration-300 
    ${
      new Date(TaskDetail.dueDate) <
        new Date(new Date().setHours(0, 0, 0, 0)) ||
      TaskDetail.progress === 'DONE'
        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
        : 'bg-green-500 text-white hover:bg-green-600'
    }`}
        disabled={
          new Date(TaskDetail.dueDate) <
          new Date(new Date().setHours(0, 0, 0, 0))
        }
      >
        Mark As Done
      </button>
      <Action_Buttons TaskDetail={TaskDetail} />
    </div>
  )
}
export default TaskCard2
