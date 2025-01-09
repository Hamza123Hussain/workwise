import React from 'react'
import { motion } from 'framer-motion'
import AssignedUserSelect from './AssignUserSelected'

interface TargetProps {
  index: number
  target: {
    TargetName: string
    TargetValue: number
    TargetAchieved: boolean
    ValueAchieved: number
    Priority: string
    PointsGained: number
    TotalPoints: number
    AssignedTo: string
  }
  handleTargetChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleRemoveTarget: (index: number) => void
  users: string[]
}

const TargetInput: React.FC<TargetProps> = ({
  index,
  target,
  handleTargetChange,
  handleRemoveTarget,
  users,
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        {/* Title and Remove button for each target */}
        <h3 className="text-xl font-medium">Target {index + 1}</h3>
        {index > 0 && (
          <button
            type="button"
            onClick={() => handleRemoveTarget(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove Target
          </button>
        )}
      </div>

      {/* Target Name */}
      <motion.div
        initial={{ x: -20, opacity: 0 }} // Initial animation settings
        animate={{ x: 0, opacity: 1 }} // Final animation settings
        transition={{ duration: 0.3 }} // Duration of the animation
      >
        <label className="block text-gray-600 mb-2">Target Name</label>
        <input
          type="text"
          name="TargetName"
          value={target.TargetName}
          onChange={(e) => handleTargetChange(index, e)} // Update target name
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </motion.div>

      {/* Target Value */}
      <motion.div
        initial={{ x: -20, opacity: 0 }} // Initial animation settings
        animate={{ x: 0, opacity: 1 }} // Final animation settings
        transition={{ duration: 0.4 }} // Duration of the animation
      >
        <label className="block text-gray-600 mb-2">Target Value</label>
        <input
          type="number"
          name="TargetValue"
          value={target.TargetValue}
          onChange={(e) => handleTargetChange(index, e)} // Update target value
          min={0}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </motion.div>

      {/* Priority Selection */}
      <motion.div
        initial={{ x: -20, opacity: 0 }} // Initial animation settings
        animate={{ x: 0, opacity: 1 }} // Final animation settings
        transition={{ duration: 0.7 }} // Duration of the animation
      >
        <label className="block text-gray-600 mb-2">Priority</label>
        <select
          name="Priority"
          value={target.Priority}
          onChange={(e) => handleTargetChange(index, e)} // Update priority
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </motion.div>

      {/* Total Points */}
      <motion.div
        initial={{ x: -20, opacity: 0 }} // Initial animation settings
        animate={{ x: 0, opacity: 1 }} // Final animation settings
        transition={{ duration: 0.9 }} // Duration of the animation
      >
        <label className="block text-gray-600 mb-2">Total Points</label>
        <input
          type="number"
          name="TotalPoints"
          value={target.TotalPoints}
          onChange={(e) => handleTargetChange(index, e)} // Update total points
          min={0}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled // Total points is automatically set based on priority
        />
      </motion.div>

      {/* Assigned User */}
      <AssignedUserSelect
        index={index}
        target={target}
        handleTargetChange={handleTargetChange}
        users={users}
      />
    </div>
  )
}

export default TargetInput
