import React, { useState } from 'react'
import { Task } from '@/functions/Roles/CreateNewRole'

interface TaskManagerProps {
  tasks: Task[]
  onAddTask: (task: Task) => void
  onRemoveTask: (index: number) => void
}

export const TaskManager = ({
  tasks,
  onAddTask,
  onRemoveTask,
}: TaskManagerProps) => {
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')

  const handleAdd = () => {
    if (!taskName.trim()) return
    onAddTask({ TaskName: taskName, Priority: priority })
    setTaskName('')
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-700">
        Role Tasks & Priorities
      </label>
      <div className="flex gap-2">
        <input
          className="border rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="e.g. Update Dashboard"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="border rounded-lg px-3 py-2 bg-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Add
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto border rounded-lg divide-y bg-white">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-800">{task.TaskName}</p>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                  task.Priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : task.Priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}
              >
                {task.Priority}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemoveTask(index)}
              className="text-gray-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
