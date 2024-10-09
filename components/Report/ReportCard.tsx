import React, { useRef } from 'react'
import ReportBody from './ReportBody'
import ReportHead from './ReportHead'
import DownloadButton from './DownloadButton'
import { ReportCardProps } from '@/utils/Report_Interface'
const ReportCard: React.FC<ReportCardProps> = ({ mergedData }) => {
  const reportRef = useRef(null)
  return (
    <div className=" flex flex-col justify-center items-center">
      <div
        className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto"
        ref={reportRef}
      >
        <ReportHead />
        <table className=" border-collapse border border-purple-600 text-center text-white">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-purple-500 p-2 text-[12px]">
                Username
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Attendance Percentage
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                High Priority Tasks
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Medium Priority Tasks
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Low Priority Tasks
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Task Completion Percentage
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Task & Attendance Percentage
              </th>
              <th className="border border-purple-500 p-2 text-[12px]">
                Salary
              </th>
            </tr>
          </thead>
          <ReportBody mergedData={mergedData} />
        </table>
      </div>
      <DownloadButton reportRef={reportRef} />
    </div>
  )
}
export default ReportCard
