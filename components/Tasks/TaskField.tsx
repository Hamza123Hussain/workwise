import { TaskFieldProps } from '@/utils/TaskformInterface'
import React from 'react'
const TaskField: React.FC<TaskFieldProps> = ({
  Label,
  name,
  value,
  handleChange,
  type,
}) => {
  return (
    <>
      {name === 'description' ? (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-purple-400">
            {Label}
          </label>
          <textarea
            name={name}
            className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={value}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      ) : name == 'priority' ? (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-purple-400">
            {Label}
          </label>
          <select
            name={name}
            className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={value}
            onChange={handleChange}
            required
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-purple-400">
            {Label}
          </label>
          <input
            type={type}
            name={name}
            className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      )}
    </>
  )
}
export default TaskField
