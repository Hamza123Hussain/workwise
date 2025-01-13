import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TargetInput from './TargetInput'
import SubmitButton from '../SubmitButton'

// Define the type for a single target
interface Target {
  TargetName: string
  TargetValue: number
  TargetAchieved: boolean
  ValueAchieved: number
  Priority: string
  PointsGained: number
  TotalPoints: number
}

const TargetForm: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([
    {
      TargetName: '',
      TargetValue: 0,
      TargetAchieved: false,
      ValueAchieved: 0,
      Priority: 'High',
      PointsGained: 0,
      TotalPoints: 10, // Default points for high priority
    },
  ])

  const priorityPointsMapping: Record<string, number> = {
    High: 10,
    Medium: 5,
    Low: 2.5,
  }

  const handleTargetChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    const updatedTargets = [...targets]

    if (name === 'Priority') {
      const newTotalPoints =
        priorityPointsMapping[value as keyof typeof priorityPointsMapping]
      updatedTargets[index] = {
        ...updatedTargets[index],
        [name]: value,
        TotalPoints: newTotalPoints,
      }
    } else {
      updatedTargets[index] = {
        ...updatedTargets[index],
        [name]: value,
      }
    }

    setTargets(updatedTargets)
  }

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
        TotalPoints: 10,
      },
    ])
  }

  const handleRemoveTarget = (index: number) => {
    const updatedTargets = targets.filter((_, i) => i !== index)
    setTargets(updatedTargets)
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Targets</h2>
      <form>
        {targets.map((target, index) => (
          <TargetInput
            key={index}
            index={index}
            target={target}
            handleTargetChange={handleTargetChange}
            handleRemoveTarget={handleRemoveTarget}
          />
        ))}
        <button
          type="button"
          onClick={handleAddTarget}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-6"
        >
          Add New Target
        </button>
        <SubmitButton targets={targets} />
      </form>
    </motion.div>
  )
}

export default TargetForm
