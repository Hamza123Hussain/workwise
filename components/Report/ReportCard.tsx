import React, { useRef } from 'react'
import ReportBody from './ReportBody'
import ReportHead from './ReportHead'
import DownloadButton from './DownloadButton'
import { ReportCardProps } from '@/utils/Report_Interface'
import { calculateTotalSalary } from '@/functions/Frontend/SalaryTotal'
const ReportCard: React.FC<ReportCardProps> = ({ mergedData }) => {
  const reportRef = useRef(null)
  // Format the total salary to two decimal places
  const formattedTotalSalary = calculateTotalSalary(mergedData).toFixed(0)
  return (
    <div className="flex flex-col justify-center items-center">
      <div ref={reportRef}>
        <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
          <ReportHead />
          <table className="border-collapse border border-purple-600 text-center text-white w-full">
            <thead>
              <tr className="bg-[#a67dff] text-white">
                <th className="border border-purple-500 p-2 text-xs">
                  Username
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  High Priority Tasks
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  Medium Priority Tasks
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  Low Priority Tasks
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  Attendance Percentage
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  Task Percentage
                </th>
                <th className="border border-purple-500 p-2 text-xs whitespace-nowrap">
                  Performance Percentage
                </th>
                <th className="border border-purple-500 p-2 text-xs">Salary</th>
              </tr>
            </thead>
            <ReportBody mergedData={mergedData} />
          </table>
        </div>
        {/* Total Salary Section */}
        <div className="bg-[#a67dff] text-white mt-4 p-4 w-[30vw]  mx-auto rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold">Total Salaries To Be Paid</h2>
          <p className="text-2xl">{formattedTotalSalary}</p>
        </div>
      </div>
      <div className="mt-4">
        <DownloadButton text="Performance" reportRef={reportRef} />
      </div>
    </div>
  )
}
export default ReportCard
