import React from 'react'

interface User {
  _id: string
  Name: string
  Email: string
}

interface UserSelectorProps {
  allUsers: User[]
  selectedUsers: { UserId: string; UserName: string }[]
  onAddUser: (user: User) => void
  onRemoveUser: (id: string) => void
}

export const UserSelector = ({
  allUsers,
  selectedUsers,
  onAddUser,
  onRemoveUser,
}: UserSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">
        Assign Employees
      </label>
      <div className="flex gap-2">
        <select
          className="border rounded-lg px-3 py-2 flex-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => {
            const user = allUsers.find((u) => u._id === e.target.value)
            if (user) onAddUser(user)
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select a user to assign...
          </option>
          {allUsers.map((u) => (
            <option key={u._id} value={u._id}>
              {u.Name} ({u.Email})
            </option>
          ))}
        </select>
      </div>

      {/* Selected Users Badges */}
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        {selectedUsers.length === 0 && (
          <span className="text-gray-400 text-sm italic">
            No users assigned yet
          </span>
        )}
        {selectedUsers.map((u) => (
          <div
            key={u.UserId}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            {u.UserName}
            <button
              type="button"
              onClick={() => onRemoveUser(u.UserId)}
              className="hover:text-red-300 transition-colors ml-1 text-lg"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
