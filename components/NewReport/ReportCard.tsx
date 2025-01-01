import { NewReport } from '@/utils/NewReportInterface'
import React from 'react'

const ReportCard = ({ report }: { report: NewReport }) => {
  const formattedTotalPaid = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(report.Salary)
  return (
    <div
      key={report._id}
      className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl p-8 border border-gray-300 max-w-md mx-auto"
    >
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-700">{report.UserName}</h2>
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-blue-800">
              High Priority Tasks:
            </span>{' '}
            {report.HighPriorityTask}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-yellow-800">
              Medium Priority Tasks:
            </span>{' '}
            {report.mediumPriorityTask}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-green-800">
              Low Priority Tasks:
            </span>{' '}
            {report.lowPriorityTask}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-gray-800">Total Tasks:</span>{' '}
            {report.TotalTasks}
          </p>
        </div>
      </div>

      {/* Performance Details */}
      <div className="grid grid-cols-1 gap-4 w-full mt-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-indigo-800">Task Completion:</span>{' '}
            {report.TaskPercentage}%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-purple-800">Attendance:</span>{' '}
            {report.AttendancePercentage}%
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold text-red-800">Performance:</span>{' '}
            {report.PerformancePercentage}%
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-400 my-6"></div>

      {/* Salary Details */}
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-bold text-gray-900">Salary:</p>
        <p className="text-2xl font-bold text-green-700">
          PKR {formattedTotalPaid}
        </p>
      </div>
    </div>
  )
}

export default ReportCard
