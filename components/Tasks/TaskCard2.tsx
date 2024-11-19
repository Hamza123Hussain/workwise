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
    <div className="bg-[#a57eff] rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl p-4 sm:p-6 w-80 sm:w-full mx-auto my-2 transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col">
        <h2
          className="text-lg sm:text-xl font-semibold border-b-4 border-gray-100 w-full text-white truncate mb-3"
          title={TaskDetail.name}
        >
          {TaskDetail.name}
        </h2>
      </div>
      <div className="mb-4">
        <div className="flex flex-col text-white mb-2">
          <span className="text-sm">Assigned to</span>
          <span className="font-medium text-sm">{TaskDetail.assignedTo}</span>
        </div>

        <div className="flex flex-col text-white mb-2">
          <span className="text-sm">Created on</span>
          <span className="font-medium text-sm">
            {new Date(TaskDetail.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col text-white mb-2">
          <span className="text-sm">Task Type</span>
          <span className="font-medium text-sm">{TaskDetail.TaskType}</span>
        </div>

        <div className="flex flex-col text-white mb-4">
          <span className="text-sm">Due date</span>
          <span className="font-medium text-sm">
            {new Date(TaskDetail.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center text-sm text-white mb-2 sm:mb-0">
          <span className="font-medium mr-2">Priority</span>
          <span
            className={`font-bold ${priorityClass(
              TaskDetail
            )} text-transparent bg-clip-text`}
          >
            {TaskDetail.priority}
          </span>
        </div>

        <div className="flex items-center text-sm text-white mb-2 sm:mb-0">
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

      <div className="text-sm text-white mb-4">
        <h3 className="font-medium text-white">Description</h3>
        <p
          className="text-xs font-semibold text-white truncate"
          title={TaskDetail.description}
        >
          {TaskDetail.description}
        </p>
      </div>

      <div className="sm:flex-wrap items-center justify-between sm:justify-start space-x-2">
        <ActionButtons TaskDetail={TaskDetail} />
        <button
          onClick={() => markTaskAsDone(TaskDetail._id, user.Email, 'DONE')}
          className={`py-2 px-4 rounded-md text-white text-xs font-semibold transition-all duration-300 
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
