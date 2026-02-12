'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UpdateRoleTasks } from '@/functions/Roles/UpdateRoletask'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import { Allusers } from '@/functions/AUTH/Allusers'
import UpdateTaskTab from './UpdateTaskTab'
import UpdateUserTab from './UpdateUserTab'
export default function UpdateRoleModal({ role, userId }: any) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'tasks' | 'users'>('tasks')
  const [allEmployees, setAllEmployees] = useState([])
  const currentUser = useSelector((state: RootState) => state.user)
  // Fetch Users internally when modal opens
  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        const data = await Allusers(currentUser.Email)
        if (data) setAllEmployees(data)
      }
      fetchUsers()
    }
  }, [open, currentUser.Email])
  const handleUpdate = async (payload: any) => {
    // payload contains either Tasks, Users, RemoveTaskId, or RemoveUserId
    const response = await UpdateRoleTasks(role._id, userId, payload)
    if (response) {
      toast.success('Role updated successfully')
      // Optional: window.location.reload() or a parent state refresh
    }
  }
  return (
    <>
      <button
        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition backdrop-blur-md border border-white/30"
        onClick={() => setOpen(true)}
      >
        Manage Role
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-gray-800 animate-in fade-in zoom-in duration-200">
            {/* Header / Tabs */}
            <div className="flex bg-gray-50 border-b">
              <button
                className={`flex-1 py-4 font-bold transition ${tab === 'tasks' ? 'bg-white text-indigo-600 border-t-4 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setTab('tasks')}
              >
                Tasks
              </button>
              <button
                className={`flex-1 py-4 font-bold transition ${tab === 'users' ? 'bg-white text-indigo-600 border-t-4 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setTab('users')}
              >
                Users
              </button>
            </div>
            <div className="p-6">
              {tab === 'tasks' ? (
                <UpdateTaskTab onUpdate={handleUpdate} />
              ) : (
                <UpdateUserTab
                  role={role}
                  allEmployees={allEmployees}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
            <div className="bg-gray-50 p-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
