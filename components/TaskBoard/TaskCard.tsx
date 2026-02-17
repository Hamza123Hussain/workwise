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

const instagramTypes = [
  'PowerPulse Instagram Posts/Reels',
  'Global Grads Instagram Posts/Reels',
  'Octtoppus Instagram Posts/Reels',
]

const TaskCard = ({
  simpleTask,
  onEdit,

  onComplete,
  onUpdateStatus,
  onUpdatePosting,
}: {
  simpleTask: any
  onEdit: () => void

  onComplete: () => void
  onUpdateStatus: (status: string) => void
  onUpdatePosting?: (platform: string, status: boolean) => void
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

  // Only relevant for Instagram-type tasks
  const allPostingDone =
    instagramTypes.includes(simpleTask.type) &&
    simpleTask.Posting &&
    simpleTask.Posting.every((p: any) => p.Status === true)

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value

    // Only block Completed for Instagram tasks if posting incomplete
    const requiresPostingComplete = instagramTypes.includes(simpleTask.type)

    if (
      newStatus === 'Completed' &&
      requiresPostingComplete &&
      !allPostingDone
    ) {
      alert('Cannot mark as Completed until all postings are done!')
      return
    }

    onUpdateStatus(newStatus)
    if (newStatus === 'Completed') {
      onComplete()
    }
  }

  const handlePostingChange = (platform: string, checked: boolean) => {
    onUpdatePosting?.(platform, checked)
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
      </div>

      {/* Description */}
      <p
        className={`text-gray-600 mb-4 line-clamp-3 ${
          isCompleted ? 'line-through text-gray-400' : ''
        }`}
      >
        {simpleTask.description}
      </p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold">Status:</span>
        <select
          value={simpleTask.status || 'Not Started'}
          onChange={handleStatusChange}
          disabled={dueDatePassed || isCompleted}
          className="text-xs rounded-md border px-2 py-1"
        >
          {Object.keys(statusStyles).map((status) => (
            <option
              key={status}
              value={status}
              disabled={
                status === 'Completed' &&
                instagramTypes.includes(simpleTask.type) &&
                !allPostingDone
              }
            >
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Posting (Instagram only) */}
      {instagramTypes.includes(simpleTask.type) && simpleTask.Posting && (
        <div className="mb-4">
          <span className="text-xs font-semibold">Posting:</span>
          <div className="flex gap-3 mt-1">
            {simpleTask.Posting.map((p: any) => (
              <label key={p.Name} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={p.Status}
                  onChange={(e) =>
                    handlePostingChange(p.Name, e.target.checked)
                  }
                  disabled={isCompleted}
                  className="rounded border-gray-300"
                />
                {p.Name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Meta Info */}
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

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        {!isCompleted && (
          <>
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={onEdit}
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskCard
