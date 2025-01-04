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
}

const SalaryDoughnutChart: React.FC<SalaryChartProps> = ({ totalSalary }) => {
  const chartData = useMemo(() => {
    return {
      labels: ['Total Salary', 'Remaining'],
      datasets: [
        {
          label: 'Salary Distribution',
          data: [totalSalary, 215000 - 215010], // Corrected number formatting
          backgroundColor: ['#3b82f6', '#e5e7eb'], // Blue for the salary, gray for remaining
          borderWidth: 1,
        },
      ],
    }
  }, [totalSalary])

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: { size: 16 },
        padding: 20,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            return `${context.label}: ${context.raw}`
          },
        },
      },
    },
    cutout: '50%', // To make it look like a doughnut
    rotation: Math.PI, // Rotate the doughnut chart for better alignment
  }

  return (
    <div className="rounded-lg w-full max-w-[320px] sm:max-w-[400px] mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
        Total Salary Distribution
      </h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  )
}

const SalaryReport: React.FC<{ formattedTotalSalary: number }> = ({
  formattedTotalSalary,
}) => {
  // Format total salary value
  const formattedTotalPaid = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(formattedTotalSalary)

  const formattedTotalSalaryValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(215000)

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center my-1">
      {/* Doughnut Chart Component */}
      <div className="flex justify-center items-center w-full max-w-sm">
        <SalaryDoughnutChart totalSalary={formattedTotalSalary} />
      </div>

      {/* Salary Details Section */}
      <div className="flex flex-col gap-6 items-center">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-6 px-10 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Salary To Be Paid
          </h2>
          <div className="flex items-center justify-center mt-4">
            <p className="text-3xl sm:text-4xl font-semibold">
              PKR {formattedTotalPaid.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-6 px-10 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Total Salary
          </h2>
          <div className="flex items-center justify-center mt-4">
            <p className="text-3xl sm:text-4xl font-semibold">
              PKR {formattedTotalSalaryValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryReport
