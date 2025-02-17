import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
const TargetReportCard = ({ target }: { target: Target }) => {
  return (
    <div
      // Unique key for each target
      className={`rounded-lg p-2 shadow-lg  text-white ${
        target.Priority === 'High'
          ? 'bg-[#FF4D4D] '
          : target.Priority === 'Medium'
          ? 'bg-[#FFA500] '
          : 'bg-[#22C55E]'
      } hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      {/* Target name */}
      <div className=" flex  justify-between">
        <p className="text-xl font-bold">{target.TargetName}</p>
        {target.Priority === 'High' ? (
          <FcHighPriority size={40} />
        ) : target.Priority === 'Medium' ? (
          <FcMediumPriority size={40} />
        ) : (
          <FcLowPriority size={40} />
        )}
      </div>
      {/* Target achievement details */}
      <div className=" flex items-center gap-2">
        <h5>Achieved:</h5>
        <p className="text-lg  flex">
          <span className="font-semibold">{target.ValueAchieved}</span> /{' '}
          <span className="font-semibold">{target.TargetValue}</span>
        </p>
        {target.ValueAchieved === target.TargetValue ? (
          <FaCheck size={20} className=" text-green-500" />
        ) : (
          <ImCross size={20} className="text-red-500" />
        )}
      </div>
      {/* Target priority level */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-medium">Priority: {target.Priority}</p>
        <div className="flex gap-4 items-center">
          <p className="text-sm font-medium">
            Points Gained:{' '}
            <span className="font-semibold">{target.PointsGained}</span>
          </p>
          <p className="text-sm font-medium">
            Total Points:{' '}
            <span className="font-semibold">{target.TotalPoints}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TargetReportCard
