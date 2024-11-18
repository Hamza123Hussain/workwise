import { priorityClass, TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import { markTaskAsDone } from '@/functions/Task/MarkDone'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import ActionButtons from './Action_Buttons'

const progress_Class = (task: TaskFetch) => {
  switch (task.progress) {
    case 'TODO':
      return 'bg-red-500'
    case 'IN_PROGRESS':
      return 'bg-blue-600'
    case 'Minor_progress':
      return 'bg-yellow-400'
    default:
      return 'bg-green-500'
  }
}

const TaskCard2 = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className="bg-[#a57eff]  rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl p-6 w-full md:w-3/4 mx-auto my-2  transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col ">
        <h2
          className="text-lg font-semibold border-b-4 border-gray-100 w-full text-white truncate mb-3"
          title={TaskDetail.name} // Show full name on hover
        >
          {TaskDetail.name}
        </h2>
      </div>

      <div className="mb-4">
        <div className="flex flex-col justify-between text-white">
          <span className="text-sm">Assigned to</span>
          <span className="font-medium">{TaskDetail.assignedTo}</span>
        </div>
        <div className="flex justify-between flex-col text-white mt-2">
          <span className="text-sm">Created on</span>
          <span className="font-medium">
            {new Date(TaskDetail.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col justify-between text-white mt-2">
          <span className="text-sm">Task Type</span>
          <span className="font-medium">{TaskDetail.TaskType}</span>
        </div>
        <div className="flex flex-col justify-between text-white mt-2">
          <span className="text-sm">Due date</span>
          <span className="font-medium">
            {new Date(TaskDetail.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-4  flex justify-between">
        <div className="flex items-center text-sm text-white flex-col">
          <span className="font-medium mr-2">Priority</span>
          <span
            className={`font-bold ${priorityClass(
              TaskDetail
            )} text-transparent bg-clip-text`}
          >
            {TaskDetail.priority}
          </span>
        </div>
        <div className="flex items-center text-sm text-white flex-col">
          <span className="font-medium mr-2">Progress</span>
          <span
            className={`font-bold text-xs ${progress_Class(
              TaskDetail
            )} text-transparent bg-clip-text`}
          >
            {TaskDetail.progress}
          </span>
        </div>
      </div>

      <div className=" text-sm text-white">
        <h3 className="font-medium text-white">Description</h3>
        <p
          className="text-xs font-semibold text-white truncate mb-3"
          title={TaskDetail.description} // Show full name on hover
        >
          {TaskDetail.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-start">
        <ActionButtons TaskDetail={TaskDetail} />
        <button
          onClick={() => markTaskAsDone(TaskDetail._id, user.Email, 'DONE')}
          className={`py-2 px-4 rounded-md text-white text-[8px] font-semibold transition-all duration-300 
      ${
        new Date(TaskDetail.dueDate) <
          new Date(new Date().setHours(0, 0, 0, 0)) ||
        TaskDetail.progress === 'DONE'
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600'
      }`}
          disabled={
            new Date(TaskDetail.dueDate) <
            new Date(new Date().setHours(0, 0, 0, 0))
          }
        >
          Mark as Done
        </button>
      </div>
    </div>
  )
}

export default TaskCard2
