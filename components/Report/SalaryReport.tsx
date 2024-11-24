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
          data: [totalSalary, 216500 - totalSalary], // Example: assuming the total salary is a part of a larger total (1,000,000)
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
            return `${context.dataset.label}: ${context.raw}`
          },
        },
      },
    },
    cutout: '50%', // To make it look like a doughnut
    rotation: Math.PI, // Rotate the doughnut chart for better alignment
  }

  return (
    <div className="rounded-lg w-full md:w-96 mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        Total Salary Distribution
      </h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  )
}

const SalaryReport: React.FC<{ formattedTotalSalary: number }> = ({
  formattedTotalSalary,
}) => {
  return (
    <div>
      <SalaryDoughnutChart totalSalary={formattedTotalSalary} />

      <div className="bg-[#b473ff] text-white py-4 px-8 mt-4 mx-10 rounded-md shadow-md w-full md:w-96 text-center">
        {/* Icon size and color */}
        <h2 className="text-xl font-bold">Salary To Be Paid</h2>
        <div className="flex items-center justify-center ">
          <p className="text-3xl font-semibold">{formattedTotalSalary}</p>
        </div>
      </div>
    </div>
  )
}

export default SalaryReport
