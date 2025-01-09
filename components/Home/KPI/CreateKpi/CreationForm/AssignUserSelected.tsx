import React from 'react'

interface AssignedUserSelectProps {
  index: number
  target: {
    AssignedTo: string
  }
  handleTargetChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  users: string[]
}

const AssignedUserSelect: React.FC<AssignedUserSelectProps> = ({
  index,
  target,
  handleTargetChange,
  users,
}) => {
  return (
    <div>
      <label className="block text-gray-600 mb-2">Assigned To</label>
      <select
        name="AssignedTo"
        value={target.AssignedTo}
        onChange={(e) => handleTargetChange(index, e)} // Update assigned user
        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select User</option>
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AssignedUserSelect
