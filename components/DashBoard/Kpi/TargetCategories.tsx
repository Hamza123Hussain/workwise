import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'

const TargetCategories = () => {
  const TotalTargets = useSelector((state: RootState) => state.Kpi.Targets)

  const calculatePriorityData = (priority: string) => {
    const filtered = TotalTargets.filter(
      (target) => target.Priority === priority,
    )

    const totalValue = filtered.reduce(
      (acc, target) => acc + target.TargetValue,
      0,
    )

    const achievedValue = filtered.reduce(
      (acc, target) => acc + target.ValueAchieved,
      0,
    )

    const percentage = totalValue === 0 ? 0 : (achievedValue / totalValue) * 100

    return { totalValue, achievedValue, percentage }
  }

  const low = calculatePriorityData('Low')
  const medium = calculatePriorityData('Medium')
  const high = calculatePriorityData('High')

  return (
    <div className="flex flex-col gap-4">
      {/* LOW */}
      <div>
        <div className="flex items-center justify-end gap-2 mr-1">
          <h3 className="font-bold text-[14px] text-[#475267]">Low</h3>
          <h3 className="font-extrabold text-[14px] text-[#3B5677]">
            {low.achievedValue} / {low.totalValue}
          </h3>
        </div>
        <div className="w-full h-[19px] bg-[#1E3A5E] rounded-[100px] overflow-hidden">
          <div
            className="h-full bg-[#3D85F1] rounded-full transition-all duration-500"
            style={{ width: `${low.percentage}%` }}
          />
        </div>
      </div>

      {/* MEDIUM */}
      <div>
        <div className="flex items-center justify-end gap-2 mr-1">
          <h3 className="font-bold text-[14px] text-[#475267]">Medium</h3>
          <h3 className="font-extrabold text-[14px] text-[#3B5677]">
            {medium.achievedValue} / {medium.totalValue}
          </h3>
        </div>
        <div className="w-full h-[19px] bg-[#685C2A] rounded-[100px] overflow-hidden">
          <div
            className="h-full bg-[#FACC14] rounded-full transition-all duration-500"
            style={{ width: `${medium.percentage}%` }}
          />
        </div>
      </div>

      {/* HIGH */}
      <div>
        <div className="flex items-center justify-end gap-2 mr-1">
          <h3 className="font-bold text-[14px] text-[#475267]">High</h3>
          <h3 className="font-extrabold text-[14px] text-[#3B5677]">
            {high.achievedValue} / {high.totalValue}
          </h3>
        </div>
        <div className="w-full h-[19px] bg-[#763535] rounded-[100px] overflow-hidden">
          <div
            className="h-full bg-[#F87171] rounded-full transition-all duration-500"
            style={{ width: `${high.percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default TargetCategories
