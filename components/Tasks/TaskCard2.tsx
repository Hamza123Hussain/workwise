import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'

interface TaskCard2Props {
  TaskDetail: TaskFetch
}

const TaskCard2: React.FC<TaskCard2Props> = ({ TaskDetail }) => {
  const priorityColors = {
    LOW: 'bg-green-500',
    MEDIUM: 'bg-yellow-500',
    HIGH: 'bg-red-500',
  }

  const progressColors = {
    TODO: 'bg-gray-500',
    IN_PROGRESS: 'bg-blue-500',
    DONE: 'bg-green-500',
  }

  return (
    <div className="bg-purple-900 text-white rounded-lg shadow-lg p-6  mx-auto my-8 transition-transform duration-300 hover:scale-105">
      <div className="border-b border-gray-600 mb-2  ">
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

      <div className="flex  flex-col  gap-4  justify-center items-center mb-4">
        <div className="flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              priorityColors[TaskDetail.priority]
            }`}
          ></span>
          <span className="font-medium">Priority:</span>
          <span className="ml-2 font-bold">{TaskDetail.priority}</span>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              progressColors[TaskDetail.progress]
            }`}
          ></span>
          <span className="font-medium">Progress:</span>
          <span className="ml-2 font-bold">{TaskDetail.progress}</span>
        </div>
      </div>
      <div className=" my-2 flex flex-col ">
        <h1>Description</h1>
        <p className="text-sm text-gray-300">{TaskDetail.description}</p>
      </div>
      <div className="flex justify-end">
        <button className="bg-black text-purple-200 px-4 py-2 rounded-lg shadow hover:bg-purple-800 transition-all duration-200 ease-in-out">
          Edit Task
        </button>
      </div>
    </div>
  )
}

export default TaskCard2
