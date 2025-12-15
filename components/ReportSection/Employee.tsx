import { Kpi } from '@/utils/Interfaces/KPIInterface'
import React from 'react'
import { COLORS, TaskItem } from './TaskItem'
const EmployeePerformanceCard = ({ element }: { element: Kpi }) => {
  const attendance = ((element.HoursWorked / 176) * 100).toFixed(2)
  const performance = (
    (element.PointsGained / element.TotalPoints) *
    100
  ).toFixed(2)
  const targetCompletion = (
    Number(attendance) * 0.2 +
    Number(performance) * 0.8
  ).toFixed(2)
  const calculatedSalary =
    element.TotalSalary *
    (0.8 * (element.PointsGained / element.TotalPoints) +
      0.2 * (element.HoursWorked / 176))
  return (
    <div className="mx-auto border border-gray-200 shadow-md rounded-xl overflow-hidden">
      {/* --- HEADER --- */}
      <div className="bg-[#eff4ff] p-4">
        <h3 className="text-2xl font-semibold text-gray-800">
          {element.UserName}
        </h3>
        <p className="text-gray-600 text-sm">Technical Lead</p>
      </div>
      {/* --- 5 METRICS --- */}
      <div className="grid grid-cols-5 divide-x divide-gray-200 text-sm font-medium">
        <div
          className={`p-3 ${COLORS.HIGH_BG} flex items-center gap-2 text-red-700`}
        >
          <p>High Priority:</p>
          <p className="font-bold">
            {element.Targets.filter((t) => t.Priority === 'High').length}
          </p>
        </div>

        <div
          className={`p-3 ${COLORS.MEDIUM_BG} flex items-center gap-2 text-orange-700`}
        >
          <p>Medium:</p>
          <p className="font-bold">
            {element.Targets.filter((t) => t.Priority === 'Medium').length}
          </p>
        </div>
        <div
          className={`p-3 ${COLORS.LOW_BG} flex items-center gap-2 text-blue-700`}
        >
          <p>Low:</p>
          <p className="font-bold">
            {element.Targets.filter((t) => t.Priority === 'Low').length}
          </p>
        </div>
        <div
          className={`p-3 ${COLORS.ATTENDANCE_BG} flex items-center gap-2 text-gray-700`}
        >
          <p>Attendance:</p>
          <p className="font-bold">{attendance}%</p>
        </div>
        <div
          className={`p-3 ${COLORS.PERFORMANCE_BG} flex items-center gap-2 text-green-700`}
        >
          <p>Performance:</p>
          <p className="font-bold">{performance}%</p>
        </div>
      </div>
      {/* --- COMPLETION + SALARY --- */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 text-sm font-medium">
        <div
          className={`p-3 ${COLORS.COMPLETION_BG} flex items-center justify-center gap-2 text-indigo-700`}
        >
          <p>Target Completion:</p>
          <p className="font-bold">{targetCompletion}%</p>
        </div>

        <div
          className={`p-3 ${COLORS.SALARY_BG} flex items-center  justify-center gap-2 text-green-700`}
        >
          <p>Salary:</p>
          <span className=" font-bold">
            PKR{' '}
            {new Intl.NumberFormat('en-PK').format(
              Math.round(calculatedSalary)
            )}
          </span>
        </div>
      </div>
      {/* --- TASK DETAILS HEADER --- */}
      <div className="bg-white p-4">
        <p className={`text-sm font-semibold ${COLORS.TEXT_BLUE}`}>
          Assigned Tasks Details
        </p>
      </div>
      {/* --- TASK ITEMS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t bg-[#e2e2e2] border-gray-200">
        {element.Targets.map((Target, index) => (
          <TaskItem key={index} Target={Target} />
        ))}
      </div>
    </div>
  )
}

export default EmployeePerformanceCard
