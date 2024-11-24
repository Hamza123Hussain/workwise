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
import { ReportCardProps } from '@/utils/Report_Interface'

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
    <div className=" p-6 rounded-lg w-full md:w-96 mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        Task Priority Distribution
      </h2>

      {/* Doughnut Chart */}
      <Doughnut data={chartData} options={chartOptions} />

      <div className="mt-6 text-center ">
        <div className="flex items-center justify-center bg-amber-100 p-4 rounded-lg shadow-md">
          <span className="text-amber-500 font-bold">Low</span>{' '}
          <span className="text-xl ml-4">{lowPriorityTasks}</span>
        </div>

        <div className="flex items-center justify-center bg-blue-100 p-4 rounded-lg shadow-md">
          <span className="text-blue-500 font-bold">Medium </span>{' '}
          <span className="text-xl ml-4">{mediumPriorityTasks}</span>
        </div>

        <div className="flex items-center justify-center bg-red-100 p-4 rounded-lg shadow-md">
          <span className="text-red-500 font-bold">High </span>{' '}
          <span className="text-xl ml-4">{highPriorityTasks}</span>
        </div>
      </div>
    </div>
  )
}
