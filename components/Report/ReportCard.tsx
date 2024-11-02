import { calculateTotalSalary } from '@/functions/Frontend/SalaryTotal'
import { ReportCardProps } from '@/utils/Report_Interface'
import { useRef } from 'react'
import ReportHead from './ReportHead'
import ReportBody from './ReportBody'
import DownloadButton from './DownloadButton'

// ReportCard.tsx
const ReportCard: React.FC<ReportCardProps> = ({ mergedData }) => {
  const reportRef = useRef(null)
  const formattedTotalSalary = Math.floor(
    calculateTotalSalary(mergedData)
  ).toLocaleString()

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <div
        ref={reportRef}
        className="shadow-lg rounded-lg overflow-hidden w-[90vw] sm:w-auto"
      >
        <ReportHead />
        <div className="overflow-x-auto p-4">
          <table className="min-w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-[#b473ff] text-white text-lg">
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Username
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  High Priority Tasks
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Medium Priority Tasks
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Low Priority Tasks
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Attendance Percentage
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Task Percentage
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">
                  Performance Percentage
                </th>
                <th className="p-3 whitespace-nowrap font-extrabold">Salary</th>
              </tr>
            </thead>
            <ReportBody mergedData={mergedData} />
          </table>
        </div>
        <div className="bg-[#b473ff] text-white mt-6 py-6 text-center rounded-md shadow-md mx-6">
          <h2 className="text-xl font-bold">Total Salaries To Be Paid</h2>
          <p className="text-3xl font-semibold">{formattedTotalSalary}</p>
        </div>
      </div>
      <div className="mt-6">
        <DownloadButton text="Performance" reportRef={reportRef} />
      </div>
    </div>
  )
}

export default ReportCard
