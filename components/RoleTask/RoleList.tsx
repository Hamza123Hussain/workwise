'use client'
import { useEffect, useState } from 'react'
import { GetRoleTasks } from '@/functions/Roles/GetRoleTasks'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import RoleCard from './RoleCard'

export default function RoleList() {
  const User = useSelector((state: RootState) => state.user)
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const GetData = async () => {
      const Roles = await GetRoleTasks(User._id)
      if (Roles) {
        setData(Roles)
        setLoading(false)
      }
    }
    GetData()
  }, [])

  if (isLoading)
    return (
      <div className="flex justify-center mt-10 text-gray-600">Loading...</div>
    )
  if (!data?.length)
    return (
      <div className="text-gray-500 mt-10 text-center">No roles found.</div>
    )

  return (
    <div className="h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* LEFT SIDE – List */}
      <div className="bg-white shadow-md rounded-xl border p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Roles</h2>
        <div className="space-y-2">
          {data.map((role: any) => (
            <button
              key={role._id}
              onClick={() => setSelectedRole(role)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                selectedRole === role.RoleName
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="font-semibold">{role.RoleName}</span>
              <p className="text-xs opacity-70">
                {role.UsersAssigned?.length || 0} users assigned
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – Details */}
      <div className="md:col-span-2 bg-white shadow-lg border rounded-xl p-4 overflow-y-auto">
        <RoleCard role={selectedRole} />
      </div>
    </div>
  )
}
