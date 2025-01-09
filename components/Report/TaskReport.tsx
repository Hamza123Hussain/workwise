import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js'
import { useMemo } from 'react'
import { ReportCardProps } from '@/utils/Interfaces/Report_Interface'

// Register necessary chart components
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend)

export const TaskPriorityChart: React.FC<ReportCardProps> = ({
  lowPriorityTasks,
  highPriorityTasks,
  totalTasks,
}) => {
  const mediumPriorityTasks =
    totalTasks - (highPriorityTasks + lowPriorityTasks)

  // Prepare data for the chart
  const chartData = useMemo(
    () => ({
      labels: ['Low Priority', 'Medium Priority', 'High Priority'],
      datasets: [
        {
          label: 'Task Priority Distribution',
          data: [lowPriorityTasks, mediumPriorityTasks, highPriorityTasks],
          backgroundColor: ['#fbbf24', '#3b82f6', '#ef4444'],
          borderColor: ['#f59e0b', '#2563eb', '#dc2626'],
          borderWidth: 1,
        },
      ],
    }),
    [lowPriorityTasks, mediumPriorityTasks, highPriorityTasks]
  )

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Total Tasks: ${totalTasks}`,
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
    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-96 mx-auto border mt-2 border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Task Priority Distribution
      </h2>

      {/* Doughnut Chart */}
      <Doughnut data={chartData} options={chartOptions} />

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center bg-amber-100 p-4 rounded-lg shadow-md">
          <span className="text-amber-600 font-bold text-lg">Low</span>
          <span className="text-2xl font-semibold text-gray-700">
            {lowPriorityTasks}
          </span>
        </div>

        <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md">
          <span className="text-blue-600 font-bold text-lg">Medium</span>
          <span className="text-2xl font-semibold text-gray-700">
            {mediumPriorityTasks}
          </span>
        </div>

        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow-md">
          <span className="text-red-600 font-bold text-lg">High</span>
          <span className="text-2xl font-semibold text-gray-700">
            {highPriorityTasks}
          </span>
        </div>
      </div>
    </div>
  )
}
