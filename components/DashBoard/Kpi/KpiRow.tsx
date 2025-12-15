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
  return (
    <div
      key={target.TargetName}
      className={` ${
        index < length - 1 ? 'border-b-[1px] border-[#BDBDBD] ' : ''
      } py-5 px-1 flex justify-between items-center`}
    >
      <h3 className=" font-medium text-[16px] text-[#364156]">
        {target.TargetName}
      </h3>
      <div className=" flex items-center gap-2">
        <h3 className=" font-medium text-[16px] text-[#364156]">
          {target.ValueAchieved}
        </h3>{' '}
        <h3 className=" font-medium text-[16px] text-[#364156]">/</h3>{' '}
        <h3 className=" font-medium text-[16px] text-[#364156]">
          {target.TargetValue}
        </h3>
      </div>
    </div>
  )
}

export default KpiRow
