import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TargetInput from './TargetInput'
const TargetForm = () => {
  // Initializing the state with a default empty target object
  const [targets, setTargets] = useState([
    {
      TargetName: '',
      TargetValue: 0,
      TargetAchieved: false,
      ValueAchieved: 0,
      Priority: 'High',
      PointsGained: 0,
      TotalPoints: 10, // Default total points based on high priority
      AssignedTo: '',
    },
  ])
  // Mocked list of users, replace with actual user data from API or state
  const [users] = useState(['User 1', 'User 2', 'User 3'])
  // Priority to TotalPoints mapping
  const priorityPointsMapping: Record<string, number> = {
    High: 10,
    Medium: 5,
    Low: 2.5,
  }
  // Handles the change in any of the input fields for a target
  const handleTargetChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement

    const updatedTargets = [...targets]

    // If the priority changes, update the TotalPoints based on the priority
    if (name === 'Priority') {
      const newTotalPoints =
        priorityPointsMapping[value as keyof typeof priorityPointsMapping]
      updatedTargets[index] = {
        ...updatedTargets[index],
        [name]: value,
        TotalPoints: newTotalPoints, // Set TotalPoints based on priority
      }
    } else {
      updatedTargets[index] = {
        ...updatedTargets[index],
        [name]: value,
      }
    }

    setTargets(updatedTargets) // Update the targets state with the modified target
  }
  // Adds a new target object to the array
  const handleAddTarget = () => {
    setTargets([
      ...targets,
      {
        TargetName: '',
        TargetValue: 0,
        TargetAchieved: false,
        ValueAchieved: 0,
        Priority: 'High',
        PointsGained: 0,
        TotalPoints: 10, // Default total points based on high priority
        AssignedTo: '',
      },
    ])
  }
  // Removes a specific target from the array based on its index
  const handleRemoveTarget = (index: number) => {
    const updatedTargets = targets.filter((_, i) => i !== index)
    setTargets(updatedTargets) // Update the targets state with the remaining targets
  }
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }} // Initial opacity for animation
      animate={{ opacity: 1 }} // Final opacity for animation
      transition={{ duration: 0.5 }} // Duration for the fade-in effect
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Targets</h2>
      <form>
        {/* Loop through each target in the targets state */}
        {targets.map((target, index) => (
          <TargetInput
            key={index}
            index={index}
            target={target}
            handleTargetChange={handleTargetChange}
            handleRemoveTarget={handleRemoveTarget}
            users={users}
          />
        ))}
        {/* Button to add a new target */}
        <button
          type="button"
          onClick={handleAddTarget}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-6"
        >
          Add New Target
        </button>
        {/* Submit button for form submission */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-300"
          initial={{ opacity: 0 }} // Initial opacity for button
          animate={{ opacity: 1 }} // Final opacity for button
          transition={{ duration: 1 }} // Duration for the fade-in animation
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  )
}
export default TargetForm
