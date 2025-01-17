import { fetchRoleBasedTasks } from '@/functions/UserTasks/GetRoleBasedTask'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TaskDetails from './TaskDetails'
import CreateButton from './CreateButton'
const Form: React.FC = () => {
  const User = useSelector((state: RootState) => state.user) // Get user details from Redux store
  const [UserTasks, setTasks] = useState<RoleTask[]>([]) // State for tasks fetched for the user
  const [formData, setFormData] = useState<RoleTask>({
    UserId: User._id,
    TaskName: '',
    Priority: '',
    TotalPoints: 0,
    Description: '',
    DueDate: '',
  })
  // Handle input and select changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Update Priority and TotalPoints based on the selected TaskName
    if (name === 'TaskName') {
      const selectedTask = UserTasks.find((task) => task.TaskName === value)
      if (selectedTask) {
        setFormData((prev) => ({
          ...prev,
          Priority: selectedTask.Priority,
          TotalPoints: selectedTask.TotalPoints,
        }))
      }
    }
  }
  // Fetch user tasks
  const GetUserTasks = async () => {
    try {
      const DataFetched = await fetchRoleBasedTasks(User._id)
      if (DataFetched) {
        setTasks(DataFetched)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }
  useEffect(() => {
    GetUserTasks()
  }, [])
  return (
    <div className="space-y-4 h-[70vh] overflow-y-auto">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Task Name
        </label>
        <select
          name="TaskName"
          value={formData.TaskName}
          onChange={handleChange}
          className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="" disabled>
            Select a task
          </option>
          {UserTasks.map((element) => (
            <option value={element.TaskName} key={element.TaskName}>
              {element.TaskName}
            </option>
          ))}
        </select>
      </div>
      <TaskDetails
        Priority={formData.Priority}
        TotalPoints={formData.TotalPoints}
      />
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          required
          className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <CreateButton FormData={formData} />
    </div>
  )
}
export default Form
