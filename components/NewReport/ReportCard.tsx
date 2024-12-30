import { NewReport } from '@/utils/NewReportInterface'
import React from 'react'

const ReportCard = ({ report }: { report: NewReport }) => {
  return (
    <div
      key={report._id}
      className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-start"
    >
      <h2 className="text-xl font-semibold mb-2">{report.UserName}</h2>
      <p className="text-sm text-gray-600">User ID: {report.UserID}</p>
      <p className="text-sm">Month: {report.Month}</p>
      <p>Total Tasks: {report.TotalTasks}</p>
      <p>Task Percentage: {report.TaskPercentage}%</p>
      <p>Attendance Percentage: {report.AttendancePercentage}%</p>
      <p>Performance Percentage: {report.PerformancePercentage}%</p>
      <p className="font-bold mt-3">Salary: ${report.Salary}</p>
    </div>
  )
}

export default ReportCard
