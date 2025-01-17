import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React, { useState } from 'react'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarAlt,
  FaTasks,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa'

const TaskCard = ({ TaskDetails }: { TaskDetails: RoleTask }) => {
  const [description, setDescription] = useState(TaskDetails.Description) // State for editable description
  const [isEditing, setIsEditing] = useState(false) // State to toggle between view/edit mode

  // Define background colors for priority and completed status
  const getPriorityBg = () => {
    switch (TaskDetails.Priority.toLowerCase()) {
      case 'high':
        return 'bg-red-200 text-red-800'
      case 'medium':
        return 'bg-yellow-200 text-yellow-800'
      case 'low':
        return 'bg-green-200 text-green-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }
  const completedBg = TaskDetails.Completed ? 'bg-green-100' : 'bg-white'

  return (
    <div
      className={`flex flex-col p-4 rounded-lg shadow-lg border transition-all duration-200 ${getPriorityBg()} ${completedBg} hover:shadow-xl`}
    >
      {/* Task Name */}
      <h1 className="text-2xl font-bold flex items-center mb-4">
        <FaTasks className="mr-2 text-blue-500" /> {/* Changed icon color */}
        {TaskDetails.TaskName}
      </h1>

      {/* Priority */}
      <div className="flex items-center mb-2">
        <FaExclamationCircle className="mr-2 text-red-500" />{' '}
        {/* Changed icon color */}
        <span className="font-semibold text-lg">{TaskDetails.Priority}</span>
      </div>

      {/* Due Date */}
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="mr-2 text-yellow-500" />{' '}
        {/* Changed icon color */}
        <span className="text-lg">
          {' '}
          Due Date :{' '}
          {formatDueDate(TaskDetails.DueDate ? TaskDetails.DueDate : '')}
        </span>{' '}
        {/* Only shows the date */}
      </div>

      {/* Editable Description */}
      <div className="flex flex-col mb-6">
        <label
          htmlFor="description"
          className="font-semibold text-lg mb-2 flex items-center"
        >
          <FaEdit className="mr-2 text-purple-500" /> {/* Changed icon color */}
          Description:
        </label>
        {isEditing ? (
          <textarea
            id="description"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        ) : (
          <p className="text-gray-700">{description}</p>
        )}
        {isEditing ? (
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
              onClick={() => setIsEditing(false)} // Save changes and exit edit mode
            >
              <FaSave className="inline mr-1" />
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-400"
              onClick={() => {
                setDescription(TaskDetails.Description) // Reset description to original value
                setIsEditing(false)
              }}
            >
              <FaTimes className="inline mr-1" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="text-blue-500 hover:underline mt-2 flex items-center"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit className="mr-1" />
            Edit Description
          </button>
        )}
      </div>

      {/* Total Points */}
      <div className="flex items-center mb-4">
        <span className="font-semibold text-lg">
          Total Points: {TaskDetails.TotalPoints}
        </span>
      </div>

      {/* Completed Status */}
      <div className="flex items-center mb-6">
        <FaCheckCircle
          className={`mr-2 text-xl ${
            TaskDetails.Completed ? 'text-green-500' : 'text-gray-500'
          }`} // Icon color for completion status
        />
        <span className="text-lg">
          {TaskDetails.Completed ? 'Task Completed' : 'Task Not Completed'}
        </span>
      </div>

      {/* Complete Task Button */}
      <button
        className={`w-full py-3 rounded-md font-semibold text-lg ${
          TaskDetails.Completed
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        disabled={TaskDetails.Completed}
        onClick={() => alert('Task marked as complete!')}
      >
        {TaskDetails.Completed ? 'Completed' : 'Mark as Complete'}
      </button>
    </div>
  )
}

export default TaskCard
