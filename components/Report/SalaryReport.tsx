import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js'
import { useMemo } from 'react'

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend)

interface SalaryChartProps {
  totalSalary: number
  tobePaid: number
}

const SalaryDoughnutChart: React.FC<SalaryChartProps> = ({
  totalSalary,
  tobePaid,
}) => {
  const chartData = useMemo(() => {
    return {
      labels: ['To Be Paid', 'Remaining'],
      datasets: [
        {
          label: 'Salary Distribution',
          data: [tobePaid, totalSalary - tobePaid],
          backgroundColor: ['#3b82f6', '#e5e7eb'],
          borderWidth: 1,
        },
      ],
    }
  }, [totalSalary, tobePaid])

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: { size: 10 },
        padding: 8,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            return `${context.label}: ${context.raw}`
          },
        },
      },
    },
    cutout: '60%',
    rotation: Math.PI,
  }

  return (
    <div className="rounded-lg w-full max-w-[240px] sm:max-w-[280px] mx-auto">
      <h2 className="text-sm sm:text-base font-bold text-center mb-3">
        Total Salary Distribution
      </h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  )
}

const SalaryReport: React.FC<{ formattedTotalSalary: number }> = ({
  formattedTotalSalary,
}) => {
  const formattedTotalPaid = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(151435)

  const formattedTotalSalaryValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(160000)
  console.log(formattedTotalSalary)
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {/* Doughnut Chart Component */}
      <div className="flex justify-center items-center w-full max-w-72">
        <SalaryDoughnutChart tobePaid={151435} totalSalary={160000} />
      </div>

      {/* Salary Details Section */}
      <div className="flex  gap-2 items-center">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-6 rounded-lg shadow-md w-full max-w-xs text-center">
          <h2 className="text-sm sm:text-base font-bold">Salary To Be Paid</h2>
          <p className="text-2xl sm:text-3xl font-semibold mt-2">
            PKR {formattedTotalPaid.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-4 px-6 rounded-lg shadow-md w-full max-w-xs text-center">
          <h2 className="text-sm sm:text-base font-bold">Total Salary</h2>
          <p className="text-2xl sm:text-3xl font-semibold mt-2">
            PKR {formattedTotalSalaryValue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SalaryReport
