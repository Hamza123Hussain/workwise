import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import AttendanceSemiCircleChart from './AttendancePieChart'
import SalaryGaugeChart from './SalaryPieChart'
import { Target } from '@/utils/Interfaces/KPIInterface'

const COLORS = ['#D72638', '#FFB400', '#26A65B'] // High (Red), Medium (Gold), Low (Green)

export const renderPriorityChart = (
  targets: Target[],
  calculatedSalary: number,
  HoursWorked: number,
  Salary: number
) => {
  const high = targets
    .filter((t) => t.Priority === 'High')
    .reduce((acc, element) => acc + element.TargetValue, 0)
  const medium = targets
    .filter((t) => t.Priority === 'Medium')
    .reduce((acc, element) => acc + element.TargetValue, 0)
  const low = targets
    .filter((t) => t.Priority === 'Low')
    .reduce((acc, element) => acc + element.TargetValue, 0)

  const total = high + medium + low

  const data = [
    { name: 'High Priority', value: high },
    { name: 'Medium Priority', value: medium },
    { name: 'Low Priority', value: low },
  ]

  return (
    <div className="flex items-center justify-between bg-white p-6 shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Dynamic Center Label */}
        <div className="absolute text-center mt-[6rem]">
          <p className="text-gray-700 text-sm font-medium">Total Targets</p>
          <p className="text-xl font-bold">{total}</p>
        </div>

        {/* Priority Details */}
        <div className="mt-4 text-center text-sm">
          <p className="text-red-600">
            High: <span className="font-bold">{high}</span> (
            {((high / total) * 100).toFixed(1)}%)
          </p>
          <p className="text-yellow-600">
            Medium: <span className="font-bold">{medium}</span> (
            {((medium / total) * 100).toFixed(1)}%)
          </p>
          <p className="text-green-600">
            Low: <span className="font-bold">{low}</span> (
            {((low / total) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Other Components */}
      <AttendanceSemiCircleChart HoursWorked={HoursWorked} />
      <SalaryGaugeChart Salary={Salary} calculatedsalary={calculatedSalary} />
    </div>
  )
}
