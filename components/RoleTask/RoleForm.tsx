'use client'

import { CreateRoleTasks, Task } from '@/functions/Roles/CreateNewRole'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface AddRoleFormProps {
  userId: string
}

export default function AddRoleForm({ userId }: AddRoleFormProps) {
  const [role, setRole] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState('')
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High'>(
    'Low'
  )
  const [loading, setLoading] = useState(false)

  const handleAddTask = () => {
    if (!taskName.trim()) {
      toast.error('Task name cannot be empty')
      return
    }

    setTasks([...tasks, { TaskName: taskName, Priority: taskPriority }])
    setTaskName('')
    setTaskPriority('Low')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role.trim()) {
      toast.error('Role name cannot be empty')
      return
    }

    setLoading(true)
    const response = await CreateRoleTasks(userId, role, tasks)
    setLoading(false)

    if (response) {
      toast.success('Role and tasks created successfully')
      setRole('')
      setTasks([])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Role Input */}
      <input
        className="border rounded px-3 py-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="New role name"
        required
      />

      {/* Task Inputs */}
      <div className="flex gap-2 items-center">
        <input
          className="border rounded px-3 py-2 flex-1"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
        />
        <select
          value={taskPriority}
          onChange={(e) =>
            setTaskPriority(e.target.value as 'Low' | 'Medium' | 'High')
          }
          className="border rounded px-3 py-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="button"
          onClick={handleAddTask}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Task List Preview */}
      {tasks.length > 0 && (
        <ul className="border rounded p-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {task.TaskName} - <strong>{task.Priority}</strong>
              </span>
              <button
                type="button"
                onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Add Role & Tasks'}
      </button>
    </form>
  )
}
