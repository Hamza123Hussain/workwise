import { Kpi } from '@/utils/Interfaces/KPIInterface'
import React from 'react'
import { renderPieChart } from './PieChartTasks'
import TargetReportCard from './TargetReportCard'

const KpiReportCard = ({ userKpi }: { userKpi: Kpi }) => {
  /**
   * Sorts the targets by their priority (High > Medium > Low).
   * The `priorityOrder` object assigns numerical values to each priority level:
   * - High: 1
   * - Medium: 2
   * - Low: 3
   * Targets are then sorted in ascending order of their numerical priority values.
   */
  const sortedTargets = [...userKpi.Targets].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 } // Define priority order
    return priorityOrder[a.Priority] - priorityOrder[b.Priority] // Sort based on priority
  })
  return (
    <div
      id={`kpi-${userKpi.UserId}`} // Unique identifier for each user's KPI card
      key={userKpi.UserId}
      className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl z-50 border-2 border-transparent hover:border-gray-400 p-6"
    >
      {/* User Details Section */}
      <div>
        {/* Display user's name and email */}
        <h2 className="text-3xl font-extrabold text-gray-400 drop-shadow-lg">
          {userKpi.UserName}
        </h2>
        <p className="text-gray-400 text-lg">{userKpi.UserEmail}</p>
      </div>

      {/* Target Details Section */}
      <div className=" flex flex-col justify-between">
        <h3 className="text-2xl font-semibold text-black my-4">Targets</h3>
        <div className=" flex flex-col gap-2">
          {/* Loop through the sorted targets and display each target's details */}
          {sortedTargets.map((target) => (
            <TargetReportCard target={target} key={target.TargetName} />
          ))}
        </div>

        {/* Render a pie chart for the user's tasks */}
        {renderPieChart(userKpi.Targets)}
      </div>
    </div>
  )
}

export default KpiReportCard
