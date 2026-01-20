'use client'
import React from 'react'
const priorityStyles: Record<string, string> = {
  Low: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  High: 'bg-red-100 text-red-800 border-red-200',
}
const TaskCard = ({
  simpleTask,
  onEdit,
  onDelete,
  onComplete,
}: {
  simpleTask: any
  onEdit: () => void
  onDelete: () => void
  onComplete: () => void
}) => {
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  const isCompleted = simpleTask.completed
  const dueDatePassed =
    simpleTask.dueDate &&
    new Date(simpleTask.dueDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)

  return (
    <div
      className={`w-full p-5 rounded-2xl border ${
        isCompleted ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
      } shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start mb-3">
        <h2
          className={`text-lg font-semibold ${
            isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {simpleTask.name || 'Untitled Task'}
        </h2>
        {simpleTask.priority && (
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              priorityStyles[simpleTask.priority]
            } shadow-sm`}
          >
            {simpleTask.priority}
          </span>
        )}
      </div>
      <p
        className={`text-gray-600 mb-4 line-clamp-3 ${
          isCompleted ? 'line-through text-gray-400' : ''
        }`}
      >
        {simpleTask.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700 mb-4 text-xs">
        <div>
          <span className="font-semibold">Assigned:</span>{' '}
          {simpleTask.assignedTo || '—'}
        </div>
        <div>
          <span className="font-semibold">Created:</span>{' '}
          {formatDate(simpleTask.createdAt)}
        </div>
        <div>
          <span className="font-semibold">Due:</span>{' '}
          {simpleTask.dueDate ? formatDate(simpleTask.dueDate) : '—'}
        </div>
        <div>
          <span className="font-semibold">Created By:</span>{' '}
          {simpleTask.createdBy}
        </div>
        {isCompleted && (
          <div className="col-span-full text-green-600 font-semibold mt-1">
            ✔ Completed
          </div>
        )}
        {dueDatePassed && !isCompleted && (
          <div className="col-span-full text-red-600 font-semibold mt-1">
            ⚠ Due date passed
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-2">
        {!isCompleted && (
          <>
            <button
              className="hover:bg-gray-50 transition-colors rounded-sm p-2 bg-blue-400 text-white"
              onClick={onEdit}
            >
              Update
            </button>
            <button
              className="hover:bg-red-600 transition-colors rounded-sm p-2 bg-red-400 text-white"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
        <button
          onClick={onComplete}
          disabled={isCompleted || dueDatePassed} // Disable if completed or past due
          className={`  rounded-sm p-2 bg-green-400 text-white
            ${dueDatePassed && !isCompleted ? 'cursor-not-allowed opacity-50 bg-black text-white' : ''}`}
        >
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  )
}

export default TaskCard
