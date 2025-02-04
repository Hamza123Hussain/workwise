import { Cell, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#F4A261', '#2A9D8F']

const SalaryPieChart = ({
  Salary,
  calculatedsalary,
}: {
  Salary: number
  calculatedsalary: number
}) => {
  // Ensure values are valid
  const totalSalary = Math.max(0, Salary) // Salary cannot be negative
  const attainedSalary = Math.max(0, calculatedsalary) // Salary attained cannot be negative
  const data = [
    { name: 'Total Salary', value: totalSalary },
    { name: 'Salary Attained', value: attainedSalary },
  ]

  return (
    <div className="flex flex-col items-center">
      {totalSalary > 0 ? ( // Show the chart only if Total Salary is valid
        <>
          <PieChart width={220} height={220}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
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
              Total Salary:{' '}
              <span className="font-bold">{totalSalary.toFixed(2)}</span>
            </p>
            <div className="flex items-center gap-2">
              <p className="text-green-600">
                <span className="font-bold mr-2">Salary Attained:</span>
                {attainedSalary.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 mt-4">Invalid Salary data provided.</p>
      )}
    </div>
  )
}

export default SalaryPieChart
