import { PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#4A90E2', '#D3D3D3'] // Blue for attained, Light Gray for remaining

const SalaryGaugeChart = ({
  Salary,
  calculatedsalary,
}: {
  Salary: number
  calculatedsalary: number
}) => {
  const percentage = ((calculatedsalary / Salary) * 100).toFixed(1)

  const data = [
    { name: 'Attained', value: calculatedsalary },
    { name: 'Remaining', value: Salary - calculatedsalary },
  ]

  return (
    <div className="flex flex-col items-center p-4 rounded-lg">
      <PieChart width={240} height={160}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={65}
          outerRadius={80}
          dataKey="value"
          cornerRadius={10} // Rounded effect
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      {/* Salary Info */}
      <div className="text-center mt-2">
        <p className="text-gray-700 text-sm">
          Total Salary:
          <span className="font-bold text-gray-900 ml-1">
            PKR {Salary.toFixed(2)}
          </span>
        </p>
        <p className="text-blue-600 text-lg text-nowrap font-bold">
          Salary Attained: PKR {calculatedsalary.toFixed(2)} ({percentage}%)
        </p>
      </div>
    </div>
  )
}

export default SalaryGaugeChart
