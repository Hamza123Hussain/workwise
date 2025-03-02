const AttendanceSemiCircleChart = ({
  HoursWorked,
}: {
  HoursWorked: number
}) => {
  const total = 160
  const percentage = ((HoursWorked / total) * 100).toFixed(1)

  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-40 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="bg-green-500 w-full transition-all duration-500"
          style={{ height: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-lg font-bold text-green-600">{percentage}%</p>

      <p className="text-sm">
        Hours Worked: <span className="font-bold">{HoursWorked}</span> / {total}
      </p>
    </div>
  )
}

export default AttendanceSemiCircleChart
