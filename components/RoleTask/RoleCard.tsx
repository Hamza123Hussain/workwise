'use client'
import { useSelector } from 'react-redux'
import DeleteConfirm from './DeleteRole'

import { RootState } from '@/utils/Redux/Store/Store'
import UpdateRoleModal from './UpdateRole'

export default function RoleCard({
  role,
  onUpdate,
}: {
  role: any
  onUpdate: () => void
}) {
  const User = useSelector((state: RootState) => state.user)

  if (!role)
    return (
      <div className="flex items-center justify-center text-gray-500 h-full text-lg">
        👈 Select a role to view its tasks
      </div>
    )

  return (
    <div className="space-y-6 h-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold capitalize">{role.RoleName}</h1>
          <p className="text-sm opacity-80">
            {role.UsersAssigned?.length || 0} users assigned
          </p>
        </div>
        <UpdateRoleModal role={role} userId={User._id} onUpdate={onUpdate} />
      </div>

      {/* TASK LIST */}
      <div className="grid sm:grid-cols-2 gap-4">
        {role.Tasks.map((task: any) => (
          <div
            key={task._id}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4 space-y-3"
          >
            {/* TITLE + DELETE */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{task.TaskName}</h3>
              <DeleteConfirm
                TaskID={task._id}
                RoleTasksId={role._id}
                userId={User._id}
                onDeleted={onUpdate}
              />
            </div>

            {/* DESCRIPTION */}
            {task.Description && (
              <p className="text-sm text-gray-600">{task.Description}</p>
            )}

            {/* BADGE */}
            <div className="flex">
              <span
                className={`px-3 py-1 rounded-md text-white text-xs font-semibold ${
                  task.Priority === 'High'
                    ? 'bg-red-500'
                    : task.Priority === 'Medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-600'
                }`}
              >
                {task.Priority} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
