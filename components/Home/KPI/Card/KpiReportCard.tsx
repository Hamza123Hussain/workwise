import { Kpi } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const KpiReportCard = ({ report }: { report: Kpi }) => {
  const highTargets = report.Targets.filter(
    (task) => task.Priority === 'High'
  ).length
  const mediumTargets = report.Targets.filter(
    (task) => task.Priority === 'Medium'
  ).length
  const lowTargets = report.Targets.filter(
    (task) => task.Priority === 'Low'
  ).length

  const taskCompletionPercentage =
    (report.PointsGained / report.TotalPoints) * 100
  const attendancePercentage = (report.HoursWorked / 184) * 100
  const performancePercentage =
    attendancePercentage * 0.2 + taskCompletionPercentage * 0.8

  const calculatedSalary = (report.Salary * performancePercentage) / 100
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl p-8 border border-gray-300 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-700">{report.UserName}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-blue-800">
              High Priority Targets:
            </span>{' '}
            {highTargets}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-gray-700 text-nowrap">
            <span className="font-bold text-yellow-800">
              Medium Priority Targets:
            </span>{' '}
            {mediumTargets}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-green-800">
              Low Priority Targets:
            </span>{' '}
            {lowTargets}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-gray-800">Total Targets:</span>{' '}
            {report.Targets.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full mt-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 text-nowrap">
            <span className="font-bold text-indigo-800">
              Target Completion:
            </span>{' '}
            {taskCompletionPercentage.toFixed(2)}%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-purple-800">Attendance:</span>{' '}
            {attendancePercentage.toFixed(2)}%
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-red-800">Performance:</span>{' '}
            {performancePercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-400 my-6"></div>

      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-bold text-gray-900">Salary:</p>
        <p className="text-lg font-bold text-green-700">
          PKR{' '}
          {calculatedSalary.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  )
}

export default KpiReportCard
