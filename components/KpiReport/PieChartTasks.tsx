import { Target } from '@/utils/Interfaces/KPIInterface'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import AttendancePieChart from './AttendancePieChart'
import SalaryPieChart from './SalaryPieChart'
const COLORS = ['#E63946', '#F4A261', '#2A9D8F']
export const renderPieChart = (
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
    <div className=" flex items-center justify-between">
      <div className="flex flex-col items-center">
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className="mt-4 text-center flex flex-col text-sm">
          <p>
            Total Targets: <span className="font-bold">{total}</span>
          </p>
          <div className=" flex items-center gap-2">
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
      </div>
      <AttendancePieChart HoursWorked={HoursWorked} />
      <SalaryPieChart Salary={Salary} calculatedsalary={calculatedSalary} />
    </div>
  )
}
