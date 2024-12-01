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
          data: [totalSalary, 216500 - 207296], // Corrected number formatting
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
  }).format(207296)

  const formattedTotalSalaryValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(216500)

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center my-5">
      <SalaryDoughnutChart totalSalary={formattedTotalSalary} />

      <div className="flex flex-col gap-4 items-center">
        <div className="bg-[#b473ff] text-white py-4 px-14 rounded-md shadow-md w-full max-w-[320px] sm:max-w-[400px] text-center">
          <h2 className="text-lg sm:text-xl font-bold">Salary To Be Paid</h2>
          <div className="flex items-center justify-center mt-2">
            <p className="text-2xl sm:text-3xl font-semibold">
              {formattedTotalPaid}
            </p>
          </div>
        </div>
        <div className="bg-[#b473ff] text-white py-4 px-14 rounded-md shadow-md w-full max-w-[320px] sm:max-w-[400px] text-center">
          <h2 className="text-lg sm:text-xl font-bold">Total Salary</h2>
          <div className="flex items-center justify-center mt-2">
            <p className="text-2xl sm:text-3xl font-semibold">
              {formattedTotalSalaryValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryReport
