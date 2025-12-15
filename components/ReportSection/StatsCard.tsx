import { Kpi } from '@/utils/Interfaces/KPIInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
// components/TotalStatsCard.js
const TotalStatsCard = ({
  title,
  colorClass,
  progressColor,
}: {
  title: string
  colorClass: string
  progressColor: string
}) => {
  const kpis = useSelector((state: RootState) => state.KpiList)
  const { totalPoints, totalPointsGained, TotalHours } = useMemo(() => {
    const totalPoints = kpis.reduce((a, k: Kpi) => a + k.TotalPoints, 0)
    const totalPointsGained = kpis.reduce((a, k: Kpi) => a + k.PointsGained, 0)
    const TotalHours = kpis.reduce(
      (a, element: Kpi) => a + element.HoursWorked,
      0
    )
    return {
      totalPoints,
      totalPointsGained,
      TotalHours,
    }
  }, [kpis])
  const performancePercent = ((totalPointsGained / totalPoints) * 100).toFixed(
    2
  )
  const AttendancePercent = (TotalHours / (kpis.length * 176)) * 100
  return (
    <div className="bg-[#eff4ff] p-6 rounded-xl shadow-md flex flex-col justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-4xl sm:text-4xl font-extrabold my-2 ${colorClass}`}>
          {title === 'Total Attendance'
            ? AttendancePercent.toFixed(2)
            : performancePercent}
          %
        </p>
      </div>
      {/* Progress Bar Container */}
      <div className="mt-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{
            width: `${
              title === 'Total Attendance'
                ? AttendancePercent
                : performancePercent
            }%`,
          }}
        ></div>
      </div>
    </div>
  )
}
export default TotalStatsCard
