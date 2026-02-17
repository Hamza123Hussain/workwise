// components/TaskTypeSelect.tsx
import React from 'react'

export type Priority = 'Low' | 'Medium' | 'High' | ''

export type TaskFormData = {
  name: string
  description: string
  assignedTo: string
  priority: Priority
  dueDate: string
  type: string
}

type TaskType = {
  TaskName: string
  Priority: Priority
}

type Props = {
  value: string
  tasks: TaskType[]
  onChange: (taskName: string, priority?: TaskType['Priority']) => void
}

const TaskTypeSelect: React.FC<Props> = ({ value, tasks, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-600">
        Task Type
      </label>

      <select
        value={value}
        onChange={(e) => {
          const selected = tasks.find(
            (task) => task.TaskName === e.target.value,
          )
          onChange(e.target.value, selected?.Priority)
        }}
        className="
          w-full rounded border border-gray-300 p-2 text-sm
          focus:border-blue-500 focus:outline-none
        "
      >
        <option value="" disabled>
          Select task
        </option>

        {tasks.map((task) => (
          <option key={task.TaskName} value={task.TaskName}>
            {task.TaskName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TaskTypeSelect
