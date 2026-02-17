import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const KpiRow = ({
  target,
  index,
  length,
}: {
  target: Target
  index: number
  length: number
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-600'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-600'
      case 'Low':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div
      key={target.TargetName}
      className={`${
        index < length - 1 ? 'border-b-[1px] border-[#BDBDBD]' : ''
      } py-5 px-1 flex justify-between items-center`}
    >
      <div className="flex items-center gap-3">
        <h3 className="font-medium text-[16px] text-[#364156]">
          {target.TargetName}
        </h3>

        {/* Priority Badge */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(
            target.Priority,
          )}`}
        >
          {target.Priority}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="font-medium text-[16px] text-[#364156]">
          {target.ValueAchieved}
        </h3>
        <h3 className="font-medium text-[16px] text-[#364156]">/</h3>
        <h3 className="font-medium text-[16px] text-[#364156]">
          {target.TargetValue}
        </h3>
      </div>
    </div>
  )
}

export default KpiRow
