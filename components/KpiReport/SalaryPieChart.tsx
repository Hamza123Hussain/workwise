import { Cell, Pie, PieChart, Tooltip } from 'recharts'
const COLORS = ['#F4A261', '#2A9D8F']
const SalaryPieChart = ({ Salary }: { Salary: number }) => {
  const total = 70000

  const data = [
    { name: 'Total Salary', value: total },
    { name: 'Salary Attained', value: Salary },
  ]

  return (
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
          Total Salary: <span className="font-bold">{total}</span>
        </p>
        <div className=" flex items-center gap-2">
          <p className="text-green-600">
            <span className="font-bold">Salary Attained:</span>
            {Salary}
          </p>
        </div>
      </div>
    </div>
  )
}
export default SalaryPieChart
