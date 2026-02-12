'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { CreateRoleTasks, Task } from '@/functions/Roles/CreateNewRole'
import Loader from '@/components/Loader'
import { Allusers } from '@/functions/AUTH/Allusers'
import { TaskManager } from './TaskManager'
import { UserSelector } from './UserSelector'
export default function AddRoleForm() {
  const user = useSelector((state: any) => state.user)
  const [roleName, setRoleName] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [allUsers, setAllUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState<
    { UserId: string; UserName: string }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  // Fetch Users on Mount
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await Allusers(user.Email)
      if (data) setAllUsers(data)
      setLoading(false)
    }
    fetchUsers()
  }, [user])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roleName.trim()) return toast.error('Please enter a role name')
    if (selectedUsers.length === 0)
      return toast.error('Assign at least one user')
    setSubmitting(true)
    // Send only the UserId to the backend as it expects { UserId: string }[]
    const formattedUsers = selectedUsers.map((u) => ({ UserId: u.UserId }))
    const response = await CreateRoleTasks(roleName, tasks, formattedUsers)
    setSubmitting(false)
    if (response) {
      setRoleName('')
      setTasks([])
      setSelectedUsers([])
    }
  }
  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader />
      </div>
    )
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100 mt-10">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Create Organizational Role
        </h1>
        <p className="text-gray-500 text-sm">
          Define a role, assign tasks, and link employees.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column: Role & Users */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Role Identity
            </label>
            <input
              className="border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g. Frontend Lead"
              required
            />
          </div>
          <UserSelector
            allUsers={allUsers}
            selectedUsers={selectedUsers}
            onAddUser={(u) => {
              if (!selectedUsers.find((curr) => curr.UserId === u._id)) {
                setSelectedUsers([
                  ...selectedUsers,
                  { UserId: u._id, UserName: u.Name },
                ])
              }
            }}
            onRemoveUser={(id) =>
              setSelectedUsers(selectedUsers.filter((u) => u.UserId !== id))
            }
          />
        </div>
        {/* Right Column: Tasks */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <TaskManager
            tasks={tasks}
            onAddTask={(newTask) => setTasks([...tasks, newTask])}
            onRemoveTask={(index) =>
              setTasks(tasks.filter((_, i) => i !== index))
            }
          />
        </div>
        {/* Full Width Footer */}
        <div className="md:col-span-2 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              submitting
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.01] active:scale-95'
            }`}
          >
            {submitting
              ? 'Processing Deployment...'
              : 'Deploy Role & Notify Users'}
          </button>
        </div>
      </form>
    </div>
  )
}
