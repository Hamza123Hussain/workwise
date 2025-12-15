import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
const TargetCategories = () => {
  const TotalTargets = useSelector((state: RootState) => state.Kpi.Targets)
  const HighPriorityTargets = TotalTargets.reduce((acc, Target) => {
    return Target.Priority === 'High' ? ++acc : acc
  }, 0)
  const MediumPriorityTargets = TotalTargets.reduce((acc, Target) => {
    return Target.Priority === 'Medium' ? ++acc : acc
  }, 0)
  const LowPriorityTargets = TotalTargets.reduce((acc, Target) => {
    return Target.Priority === 'Low' ? ++acc : acc
  }, 0)
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col">
        <div className=" flex items-center justify-end gap-2  mr-1">
          <h3 className=" font-bold text-[14px] text-[#475267]">Low</h3>
          <h3 className=" font-extrabold text-[14px] text-[#3B5677]">
            {LowPriorityTargets}
          </h3>
        </div>
        <div className="w-full h-[19px] bg-[#1E3A5E] rounded-[100px] overflow-hidden">
          {/* Inner filled portion with animation */}
          <div
            className="h-full bg-[#3D85F1] rounded-full "
            style={{
              width: `${(LowPriorityTargets / TotalTargets.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>{' '}
      <div className=" flex flex-col">
        <div className=" flex items-center justify-end gap-2 mr-1">
          <h3 className=" font-bold text-[14px] text-[#475267]">Medium</h3>
          <h3 className=" font-extrabold text-[14px] text-[#3B5677]">
            {MediumPriorityTargets}
          </h3>
        </div>
        <div className="w-full h-[19px] bg-[#685C2A] rounded-[100px] overflow-hidden">
          {/* Inner filled portion with animation */}
          <div
            className="h-full bg-[#FACC14] rounded-full "
            style={{
              width: `${(MediumPriorityTargets / TotalTargets.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className=" flex flex-col">
          <div className=" flex items-center justify-end gap-2  mr-1">
            <h3 className=" font-bold text-[14px] text-[#475267]">High</h3>
            <h3 className=" font-extrabold text-[14px] text-[#3B5677]">
              {HighPriorityTargets}
            </h3>
          </div>
          <div className="w-full h-[19px] bg-[#763535] rounded-[100px] overflow-hidden">
            {/* Inner filled portion with animation */}
            <div
              className="h-full bg-[#F87171] rounded-full "
              style={{
                width: `${(HighPriorityTargets / TotalTargets.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}
export default TargetCategories
