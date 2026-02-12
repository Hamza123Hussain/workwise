'use client'
import { useEffect, useState, useCallback } from 'react'
import { GetRoleTasks } from '@/functions/Roles/GetRoleTasks'
import { DeleteRoleTasks } from '@/functions/Roles/DeleteRoleTask' // Ensure this path is correct
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import RoleCard from './RoleCard'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react' // Using lucide-react for a clean trash icon

export default function RoleList() {
  const User = useSelector((state: RootState) => state.user)
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [refresh, setRefresh] = useState(false)

  const triggerRefresh = useCallback(() => setRefresh((prev) => !prev), [])

  useEffect(() => {
    const GetData = async () => {
      const Roles = await GetRoleTasks(User._id)
      if (Roles) {
        setData(Roles)
        if (selectedRole) {
          const updated = Roles.find((r: any) => r._id === selectedRole._id)
          setSelectedRole(updated || null) // Clear selection if role was deleted
        }
        setLoading(false)
      }
    }
    GetData()
  }, [User._id, refresh, selectedRole])

  // Improved Delete Logic
  const handleDelete = async (e: React.MouseEvent, roleId: string) => {
    e.stopPropagation() // Prevent selecting the role when clicking delete

    if (
      !confirm('Are you sure you want to delete this role and all its tasks?')
    )
      return

    const response = await DeleteRoleTasks(roleId, User._id)
    if (response) {
      toast.success('Role has been deleted')
      if (selectedRole?._id === roleId) setSelectedRole(null) // Clear card if active
      triggerRefresh() // Instant UI update
    } else {
      toast.error('Failed to delete role')
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center mt-10 text-gray-600">Loading...</div>
    )

  return (
    <div className="h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* LEFT SIDE – List with Delete Action */}
      <div className="bg-white shadow-md rounded-xl border p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Roles</h2>
        <div className="space-y-2">
          {data.map((role: any) => (
            <div key={role._id} className="group relative">
              <button
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition pr-12 ${
                  selectedRole?._id === role._id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-semibold block truncate">
                  {role.RoleName}
                </span>
                <p className="text-xs opacity-70">
                  {role.UsersAssigned?.length || 0} users assigned
                </p>
              </button>

              {/* Delete Icon - visible on hover or if selected */}
              <button
                onClick={(e) => handleDelete(e, role._id)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
                  selectedRole?._id === role._id
                    ? 'text-white hover:bg-white/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 bg-white shadow-lg border rounded-xl p-4 overflow-y-auto">
        <RoleCard role={selectedRole} onUpdate={triggerRefresh} />
      </div>
    </div>
  )
}
