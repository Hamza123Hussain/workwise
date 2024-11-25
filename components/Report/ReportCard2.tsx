import { calculateTotalSalary } from '@/functions/Frontend/SalaryTotal'
import { ReportCardProps } from '@/utils/Report_Interface'
import { useRef } from 'react'
import ReportHead from './ReportHead'
import DownloadButton from './DownloadButton'
import SelectedMonths from '../Layout/SelectedMonths'
import {
  FaCheckCircle,
  FaDollarSign,
  FaExclamationTriangle,
  FaRegClock,
  FaTasks,
} from 'react-icons/fa'
import {
  calculateAttendancePercentage,
  calculateOverallAverage,
  calculateOverallSalary,
  calculateTotalHoursWorked,
  calculateTotalTaskCompletion,
  countPriorityTasks,
} from '@/functions/Frontend/ReportFucntions'
import { TaskPriorityChart } from './TaskReport'
import SalaryReport from './SalaryReport'

// ReportCard.tsx
const ReportCardtwo: React.FC<ReportCardProps> = ({
  mergedData,
  totalTasks,
  highPriorityTasks,
  lowPriorityTasks,
}) => {
  const reportRef = useRef(null)
  const formattedTotalSalary = Math.floor(
    calculateTotalSalary(mergedData ? mergedData : [])
  )

  return (
    <div className="flex flex-col justify-center items-center my-5 bg-gray-50 min-h-screen">
      <SelectedMonths /> {/* Show selected month filter */}
      <div ref={reportRef} className=" rounded-lg overflow-hidden w-[90vw]">
        <ReportHead />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mergedData &&
            mergedData.map((userData, index) => {
              const totalTaskCompletion = calculateTotalTaskCompletion(
                userData.tasks
              )
              const totalHoursWorked = calculateTotalHoursWorked(
                userData.attendance
              )
              const attendancePercentage =
                calculateAttendancePercentage(totalHoursWorked)
              const salary = parseInt(userData.salary, 10) || 0
              const taskCompletionPercentage =
                userData.tasks.length > 0
                  ? totalTaskCompletion / userData.tasks.length
                  : 0
              const overallAverage = calculateOverallAverage(
                attendancePercentage,
                taskCompletionPercentage
              )
              const overallSalary = calculateOverallSalary(
                overallAverage,
                salary
              )

              return (
                <div
                  key={index}
                  className="bg-purple-600 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-white flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>
                      {userData.user === 'Arooj'
                        ? 'Arooj Yousaf'
                        : userData.user === 'Salman'
                        ? 'Salman Haider'
                        : userData.user}
                    </span>
                  </h3>

                  <div className="mt-5 space-y-4 text-white">
                    {/* Task Priority */}
                    <div className="flex items-center space-x-2">
                      <FaTasks className="text-blue-500" />
                      <p>
                        High Priority Tasks:{' '}
                        {countPriorityTasks(userData.tasks, 'HIGH')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTasks className="text-yellow-500" />
                      <p>
                        Medium Priority Tasks:{' '}
                        {countPriorityTasks(userData.tasks, 'MEDIUM')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaExclamationTriangle className="text-red-500" />
                      <p>
                        Low Priority Tasks:{' '}
                        {countPriorityTasks(userData.tasks, 'LOW')}
                      </p>
                    </div>

                    {/* Attendance */}
                    <div className="flex items-center space-x-2">
                      <FaRegClock className="text-purple-500" />
                      <p>Attendance: {attendancePercentage}%</p>
                    </div>

                    {/* Task Completion */}
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-teal-500" />
                      <p>
                        Task Completion: {taskCompletionPercentage.toFixed(2)}%
                      </p>
                    </div>

                    {/* Performance */}
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-600" />
                      <p>Performance: {overallAverage.toFixed(2)}%</p>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center space-x-2">
                      <FaDollarSign className="text-yellow-600" />
                      <p>
                        Salary: {Math.floor(overallSalary).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className=" flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between">
          <div className="flex items-center justify-center space-y-6">
            <TaskPriorityChart
              lowPriorityTasks={lowPriorityTasks}
              highPriorityTasks={highPriorityTasks}
              totalTasks={totalTasks}
            />
          </div>
          <div
            className=" mx-auto self-center"
            style={{
              background:
                'linear-gradient(to right, #7b5dff, #b473ff, #e25fff)', // Gradient
              color: 'white',

              padding: '44px',
              textAlign: 'center',
              borderRadius: '100%', // Round the card into a circle
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
              }}
            >
              Total Tasks
            </h2>
            <p style={{ fontSize: '28px', fontWeight: '600' }}>{totalTasks}</p>
          </div>

          <SalaryReport formattedTotalSalary={formattedTotalSalary} />
        </div>
      </div>
      <div className="mt-6 hidden lg:block">
        <DownloadButton text="Performance" reportRef={reportRef} />
      </div>
    </div>
  )
}

export default ReportCardtwo
