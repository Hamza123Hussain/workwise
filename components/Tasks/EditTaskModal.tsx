import React, { useState, useEffect } from 'react'
import { TaskFetch } from '@/utils/TaskformInterface'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: TaskFetch
  onUpdate: (updatedTask: TaskFetch) => void
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onUpdate,
}) => {
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [progress, setProgress] = useState(task.progress)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  // Handle modal submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ ...task, description, priority, progress })
    onClose() // Close the modal after update
  }

  // Update local state when task prop changes
  useEffect(() => {
    setDescription(task.description)
    setPriority(task.priority)
    setProgress(task.progress)
  }, [task])

  // Handle mouse enter and leave to manage modal close behavior
  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId) // Clear timeout when entering
  }

  const handleMouseLeave = () => {
    const id = window.setTimeout(() => {
      onClose()
    }, 300) // Delay before closing
    setTimeoutId(id) // Save the timeout ID
  }

  // Return null if the modal is not open
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 border border-[#bea2ff] z-50">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')
              }
              className="border border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="progress"
            >
              Progress
            </label>
            <select
              id="progress"
              value={progress}
              onChange={(e) =>
                setProgress(e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE')
              }
              className="border border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskModal
