import React from 'react'
import TargetCategories from './TargetCategories'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
const OverallTarget = () => {
  const Userkpi = useSelector((state: RootState) => state.Kpi)
  const TotalPoints = Userkpi.Targets.reduce(
    (acc, target) => acc + target.TotalPoints,
    0,
  )
  const PointsGained = Userkpi.Targets.reduce(
    (acc, target) => acc + target.PointsGained,
    0,
  )
  const percentage =
    TotalPoints > 0 ? ((PointsGained / TotalPoints) * 100).toFixed(1) : '0'
  const PointsSalary =
    TotalPoints > 0
      ? Userkpi.TotalSalary * 0.8 * (PointsGained / TotalPoints)
      : 0
  const AttendanceSalary =
    Userkpi.HoursWorked > 0
      ? Userkpi.TotalSalary * 0.2 * (Userkpi.HoursWorked / 176)
      : 0
  const FinalSalary = (PointsSalary + AttendanceSalary).toFixed(0)
  const formatNumber = (num: number | string) =>
    Number(num).toLocaleString('en-US')
  return (
    <div className="bg-white py-[10px] rounded-[8px] w-full px-4 flex flex-col gap-3 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] font-semibold text-[#4E6747]">Target</h3>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-bold text-[#3D85F1]">{percentage}%</h1>
        <h2 className="text-[28px] font-bold text-[#475267]">
          Rs. {formatNumber(FinalSalary)}
        </h2>
      </div>
      <div className="w-full h-[19px] bg-[#1E3A5E] rounded-[100px] overflow-hidden">
        <div
          className="h-full bg-[#3D85F1] rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-bold flex gap-1 items-center text-[#3D85F1] mt-1">
          <span className="text-[#475267]">Salary :</span>
          <span>{formatNumber(Userkpi.TotalSalary)}</span>
        </div>
        <div className="text-[14px] font-bold flex gap-1 items-center text-[#3D85F1] mt-1">
          <span className="text-[#475267]">Points :</span>
          <span>
            {Userkpi.PointsGained} / {Userkpi.TotalPoints}
          </span>
        </div>
      </div>
      <TargetCategories />
    </div>
  )
}
export default OverallTarget
