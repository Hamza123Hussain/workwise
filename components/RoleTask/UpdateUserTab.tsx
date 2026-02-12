import { useState } from 'react'

export default function UpdateUserTab({ role, allEmployees, onUpdate }: any) {
  const [selectedUserId, setSelectedUserId] = useState('')

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-700">Manage Assigned Users</h3>

      {/* Existing Users List */}
      <div className="max-h-40 overflow-y-auto space-y-2 mb-4 border rounded-lg p-2 bg-gray-50">
        {role.UsersAssigned.map((u: any) => (
          <div
            key={u.UserId}
            className="flex justify-between items-center bg-white p-2 rounded border shadow-sm"
          >
            <span className="text-sm font-medium text-gray-600">
              {u.UserName}
            </span>
            <button
              onClick={() => onUpdate({ RemoveUserId: u.UserId })}
              className="text-red-500 text-xs font-bold hover:bg-red-50 px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New User Selection */}
      <div className="pt-4 border-t">
        <select
          className="w-full border rounded-lg p-2 mb-2 outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setSelectedUserId(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select User to Add
          </option>
          {allEmployees?.map((emp: any) => (
            <option key={emp._id} value={emp._id}>
              {emp.Name}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            selectedUserId && onUpdate({ Users: [{ UserId: selectedUserId }] })
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition shadow-md"
        >
          Assign Selected User
        </button>
      </div>
    </div>
  )
}
