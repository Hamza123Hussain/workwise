import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { createKPI } from '@/functions/Kpi/CreateKpi'

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

// Props for SubmitButton
interface SubmitButtonProps {
  targets: Target[]
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ targets }) => {
  const UserSelectedID = useSelector((state: RootState) => state.UserSelect.id)

  const CreateKpi = async () => {
    if (UserSelectedID !== null) {
      try {
        await createKPI(UserSelectedID, targets)
        alert('KPI created successfully!')
      } catch (error) {
        console.error('Error creating KPI:', error)
        alert('Failed to create KPI. Please try again.')
      }
    } else {
      alert('No user selected!')
    }
  }

  return (
    <motion.button
      onClick={CreateKpi}
      type="button"
      className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Submit
    </motion.button>
  )
}

export default SubmitButton
