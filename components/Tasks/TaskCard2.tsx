import {
  priorityClass,
  progress_Class,
  TaskFetch,
} from '@/utils/TaskformInterface'
import { useRouter } from 'next/navigation'
import React from 'react'

const TaskCard2 = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const Router = useRouter()

  // Check if the due date is past
  const isDueDatePast =
    new Date(TaskDetail.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))

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
        <div className="flex flex-col items-center">
          <span className="font-medium">Priority</span>
          <span className={`ml-2 font-bold ${priorityClass(TaskDetail)}`}>
            {TaskDetail.priority}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Progress</span>
          <span className={`ml-2 font-bold ${progress_Class(TaskDetail)}`}>
            {TaskDetail.progress}
          </span>
        </div>
      </div>
      <div className="my-2 flex flex-col">
        <h1>Description</h1>
        <p className="text-sm text-gray-300">{TaskDetail.description}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            !isDueDatePast && Router.push(`/edittask/${TaskDetail._id}`)
          } // Only navigate if the due date is not past
          className={`px-4 py-2 rounded-lg shadow transition-all duration-200 ease-in-out 
                      ${
                        isDueDatePast
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : 'bg-black text-purple-200 hover:bg-purple-800'
                      }`}
          disabled={isDueDatePast} // Disable button if the due date is past
        >
          Edit Task
        </button>
      </div>
    </div>
  )
}

export default TaskCard2
