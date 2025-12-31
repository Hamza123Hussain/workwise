'use client'
import { useSelector } from 'react-redux'
import DeleteConfirm from './DeleteRole'
import UpdateRoleModal from './UpdateRole'
import { RootState } from '@/utils/Redux/Store/Store'
export default function RoleCard({ role, refresh }: any) {
  const User = useSelector((state: RootState) => state.user)
  if (!role)
    return (
      <div className="flex items-center justify-center text-gray-500 h-full text-lg">
        👈 Select a role from the list to view details
      </div>
    )
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* ROLE HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold capitalize">{role.RoleName}</h1>
          <p className="text-sm opacity-80">
            {role.UsersAssigned?.length || 0} users assigned to this role
          </p>
        </div>
        <UpdateRoleModal role={role} userId={User._id} />
      </div>
      {/* TASK LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {role.Tasks.map((task: any) => (
          <div
            key={task._id}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{task.TaskName}</h3>

              {/* DELETE BUTTON */}
              <DeleteConfirm RoleTasksId={role._id} userId={User._id} />
            </div>
            {task.Description && (
              <p className="text-sm text-gray-600">{task.Description}</p>
            )}
            {/* BADGES */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span
                className={`px-2 py-1 rounded-md text-white ${
                  task.Priority === 'High'
                    ? 'bg-red-500'
                    : task.Priority === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-600'
                }`}
              >
                Priority: {task.Priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
