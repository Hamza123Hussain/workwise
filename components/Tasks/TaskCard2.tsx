import {
  priorityClass,
  progress_Class,
  TaskFetch,
} from '@/utils/TaskformInterface'
import React from 'react'
import Action_Buttons from './Action_Buttons'
const TaskCard2 = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  return (
    <div className="bg-purple-900 text-white rounded-lg shadow-lg p-6 xs:w-full w-[60vw]  md:w-[30vw]  mx-auto my-8 transition-transform duration-300 hover:scale-105">
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
            )} text-transparent bg-<color> bg-clip-text`}
          >
            {TaskDetail.progress}
          </span>
        </div>
      </div>
      <div className="my-2 flex flex-col h-1/6">
        <h1>Description</h1>
        <p className="text-sm text-gray-300">{TaskDetail.description}</p>
      </div>
      <Action_Buttons TaskDetail={TaskDetail} />
    </div>
  )
}
export default TaskCard2
