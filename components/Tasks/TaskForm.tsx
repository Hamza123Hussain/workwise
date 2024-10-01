import React from 'react'
import { TaskFormProps } from '../../utils/TaskformInterface'
const TaskForm: React.FC<TaskFormProps> = ({
  name,
  description,
  dueDate,
  assignedTo,
  setName,
  setDescription,
  setDueDate,
  setAssignedTo,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-lg shadow-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-700">
          Description
        </label>
        <textarea
          className="w-full p-3 rounded-lg shadow-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          className="w-full p-3 rounded-lg shadow-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-700">
          Assigned To (User ID)
        </label>
        <select
          className="w-full p-3 rounded-lg shadow-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select>
      </div>
    </div>
  )
}

export default TaskForm
