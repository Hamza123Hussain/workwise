import { calculateTotalSalary } from '@/functions/Frontend/SalaryTotal'
import { ReportCardProps } from '@/utils/Report_Interface'
import { useRef } from 'react'
import ReportHead from './ReportHead'
import ReportBody from './ReportBody'
import DownloadButton from './DownloadButton'
import SelectedMonths from '../Layout/SelectedMonths'

// ReportCard.tsx
const ReportCard: React.FC<ReportCardProps> = ({
  mergedData,
  totalTasks,
  highPriorityTasks,
  lowPriorityTasks,
}) => {
  const reportRef = useRef(null)
  const formattedTotalSalary = Math.floor(
    calculateTotalSalary(mergedData ? mergedData : [])
  ).toLocaleString()

  return (
    <div className="flex flex-col justify-center items-center my-5 bg-gray-50 min-h-screen">
      <SelectedMonths /> {/* Show selected month filter */}
      <div ref={reportRef} className=" rounded-lg overflow-hidden w-[90vw]">
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
            {mergedData && <ReportBody mergedData={mergedData} />}
          </table>
        </div>{' '}
        <div className=" flex items-center justify-center sm:flex-row flex-col">
          {' '}
          <div className="bg-yellow-500 text-white mt-6 py-6 w-full md:w-64 p-2 text-center rounded-md shadow-md mx-6">
            <h2 className="text-xl font-bold">Low Priority Tasks</h2>
            <p className="text-3xl font-semibold">{lowPriorityTasks}</p>
          </div>
          <div className="bg-blue-500 text-white mt-6 py-6 w-full md:w-64 p-2 text-center rounded-md shadow-md mx-6">
            <h2 className="text-xl font-bold">Medium Priority Tasks</h2>
            <p className="text-3xl font-semibold">
              {totalTasks - (highPriorityTasks + lowPriorityTasks)}
            </p>
          </div>{' '}
          <div className="bg-red-500 text-white mt-6 py-6 w-full md:w-64 p-2 text-center rounded-md shadow-md mx-6">
            <h2 className="text-xl font-bold">High Priority Tasks</h2>
            <p className="text-3xl font-semibold">{highPriorityTasks}</p>
          </div>
        </div>
        <div className="bg-[#b473ff] text-white mt-6 py-6 w-full mx-auto md:w-64 text-center rounded-md shadow-md ">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl font-semibold">{totalTasks}</p>
        </div>
        <div className="bg-[#b473ff] text-white mt-6 py-6 w-full mx-auto md:w-64 text-center rounded-md shadow-md ">
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
