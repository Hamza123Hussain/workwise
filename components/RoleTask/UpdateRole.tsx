'use client'
import { UpdateRoleTasks, Task } from '@/functions/Roles/UpdateRoletask'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface UpdateRoleModalProps {
  role: {
    _id: string
    RoleName: string
  }
  userId: string // pass the logged-in user ID dynamically
}

export default function UpdateRoleModal({
  role,
  userId,
}: UpdateRoleModalProps) {
  const [open, setOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
  const [loading, setLoading] = useState(false)

  const handleAddTask = async () => {
    if (!taskName.trim()) {
      toast.error('Task name cannot be empty')
      return
    }

    setLoading(true)

    const newTask: Task = {
      TaskName: taskName,
      Priority: priority,
    }

    const response = await UpdateRoleTasks(role._id, userId, [newTask])
    setLoading(false)

    if (response) {
      setTaskName('')
      toast.success('Task added successfully')
      setOpen(false)
    } else {
      toast.error('Failed to add task')
    }
  }

  return (
    <>
      <button
        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        + Add Task
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl text-black shadow-lg p-6 w-[380px] max-w-full">
            <h3 className="text-xl font-semibold mb-4">
              Add Task to{' '}
              <span className="text-purple-600">{role.RoleName}</span>
            </h3>

            <div className="flex flex-col gap-3">
              <input
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as 'Low' | 'Medium' | 'High')
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-black ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition`}
                onClick={handleAddTask}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
