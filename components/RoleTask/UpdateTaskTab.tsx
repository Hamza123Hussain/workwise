import { useState } from 'react'

export default function UpdateTaskTab({ onUpdate }: any) {
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')

  const handleAdd = () => {
    if (!taskName.trim()) return
    onUpdate({ Tasks: [{ TaskName: taskName, Priority: priority }] })
    setTaskName('')
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-700">Add New Task</h3>
      <input
        className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <select
        className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        onClick={handleAdd}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition shadow-md"
      >
        Add Task to Role
      </button>
    </div>
  )
}
