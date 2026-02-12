'use client'
import { useEffect, useState, useCallback } from 'react'
import { GetRoleTasks } from '@/functions/Roles/GetRoleTasks'
import { DeleteRoleTasks } from '@/functions/Roles/DeleteRoleTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import RoleCard from './RoleCard'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

export default function RoleList({
  externalRefresh,
}: {
  externalRefresh: boolean
}) {
  const User = useSelector((state: RootState) => state.user)
  const [data, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [refresh, setRefresh] = useState(false)

  const triggerRefresh = useCallback(() => setRefresh((prev) => !prev), [])

  useEffect(() => {
    const GetData = async () => {
      const Roles = await GetRoleTasks(User._id)
      if (Roles) {
        setData(Roles)
        // sync selection without triggering infinite loop
        if (selectedRole) {
          const updated = Roles.find((r: any) => r._id === selectedRole._id)
          if (JSON.stringify(updated) !== JSON.stringify(selectedRole)) {
            setSelectedRole(updated || null)
          }
        }
        setLoading(false)
      }
    }
    GetData()
    // REMOVED selectedRole from dependencies to prevent the crash
  }, [User._id, refresh, externalRefresh])

  const handleDelete = async (e: React.MouseEvent, roleId: string) => {
    e.stopPropagation()

    if (!confirm('Are you sure you want to delete this role?')) return

    const response = await DeleteRoleTasks(roleId, User._id)
    if (response) {
      toast.success('Role deleted')
      if (selectedRole?._id === roleId) setSelectedRole(null)
      triggerRefresh()
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center mt-10 text-gray-600">Loading...</div>
    )

  return (
    <div className="h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* LEFT SIDE – Role Selection List */}
      <div className="bg-white shadow-md rounded-xl border p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Roles</h2>
        <div className="flex flex-col gap-2">
          {data.map((role: any) => (
            <div key={role._id} className="group relative w-full">
              <button
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left ${selectedRole && role._id === selectedRole._id ? 'bg-indigo-500 text-white' : ''} px-4 py-3 rounded-lg border transition pr-12 `}
              >
                <span className="font-semibold block truncate">
                  {role.RoleName}
                </span>
                <p className={`text-xs `}>
                  {role.UsersAssigned?.length || 0} users assigned
                </p>
              </button>

              <button
                onClick={(e) => handleDelete(e, role._id)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
                  selectedRole && selectedRole?._id === role._id
                    ? 'text-white hover:bg-white/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – Role Details */}
      <div className="md:col-span-2 bg-white shadow-lg border rounded-xl p-4 overflow-y-auto">
        <RoleCard role={selectedRole} onUpdate={triggerRefresh} />
      </div>
    </div>
  )
}
