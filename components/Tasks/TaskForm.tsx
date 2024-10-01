import React, { useEffect, useState } from 'react'
import { TaskFormProps } from '../../utils/TaskformInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/functions/AUTH/SignUpInterface'

const TaskForm: React.FC<TaskFormProps> = ({
  name,
  description,
  dueDate,
  assignedTo,
  setName,
  setDescription,
  setDueDate,
  setAssignedTo,
  Priority,
  setPriority,
}) => {
  const [UserFetched, SetUserFetched] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)

  const Getusers = async () => {
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
    }
  }

  useEffect(() => {
    Getusers()
  }, [])

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-purple-400">
          Task Name
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-purple-400">
          Description
        </label>
        <textarea
          className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-purple-400">
          Due Date
        </label>
        <input
          type="date"
          className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-purple-400">
          Assigned To (User ID)
        </label>
        <select
          className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {UserFetched.map((element) => (
            <option key={element.Email} value={element.Name}>
              {element.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-purple-400">
          Priority
        </label>
        <select
          className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={Priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select A Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>
    </div>
  )
}
export default TaskForm
