'use client'
import React from 'react'
const priorityStyles: Record<string, string> = {
  Low: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  High: 'bg-red-100 text-red-800 border-red-200',
}
const statusStyles: Record<string, string> = {
  'Not Started': 'bg-gray-200 text-gray-800',
  'In Progress': 'bg-blue-200 text-blue-800',
  'In Review': 'bg-purple-200 text-purple-800',
  Completed: 'bg-green-200 text-green-800',
}
const TaskCard = ({
  simpleTask,
  onEdit,
  onDelete,
  onComplete,
  onUpdateStatus, // new prop
}: {
  simpleTask: any
  onEdit: () => void
  onDelete: () => void
  onComplete: () => void
  onUpdateStatus: (status: string) => void
}) => {
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const isCompleted = simpleTask.status === 'Completed'
  const dueDatePassed =
    simpleTask.dueDate &&
    new Date(simpleTask.dueDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    onUpdateStatus(newStatus)
    if (newStatus === 'Completed') {
      onComplete()
    }
  }
  return (
    <div
      className={`w-full p-5 rounded-2xl border ${
        isCompleted ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
      } shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]`}
    >
      {/* Header */}
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
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${priorityStyles[simpleTask.priority]} shadow-sm`}
          >
            {simpleTask.priority}
          </span>
        )}
      </div>{' '}
      <p
        className={`text-gray-600 mb-4 line-clamp-3 ${
          isCompleted ? 'line-through text-gray-400' : ''
        }`}
      >
        {simpleTask.description}
      </p>
      {/* Status Dropdown */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold">Status:</span>
        <select
          value={simpleTask.status || 'Not Started'}
          onChange={handleStatusChange}
          disabled={isCompleted}
          className="text-xs rounded-md border px-2 py-1"
        >
          {Object.keys(statusStyles).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      {/* Task Meta */}
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
            ✔ Completed on: {formatDate(simpleTask.completeddate)}
          </div>
        )}
        {dueDatePassed && !isCompleted && (
          <div className="col-span-full text-red-600 font-semibold mt-1">
            ⚠ Due date passed
          </div>
        )}
      </div>
      {/* Actions */}
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
      </div>
    </div>
  )
}
export default TaskCard
