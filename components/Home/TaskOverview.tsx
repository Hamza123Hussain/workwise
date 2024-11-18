import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

interface Task {
  progress: string
  priority: string
  dueDate: string
}

interface TaskOverviewProps {
  allTasks: Task[]
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ allTasks }) => {
  const tasksDone = allTasks.filter((task) => task.progress === 'DONE')
  const tasksLeft = allTasks.length - tasksDone.length

  const highPriorityTasks = allTasks.filter((task) => task.priority === 'HIGH')
  const mediumPriorityTasks = allTasks.filter(
    (task) => task.priority === 'MEDIUM'
  )
  const lowPriorityTasks = allTasks.filter((task) => task.priority === 'LOW')

  // Doughnut chart data for task completion
  const doughnutData = {
    labels: ['Completed Tasks', 'Remaining Tasks'],
    datasets: [
      {
        data: [tasksDone.length, tasksLeft],
        backgroundColor: ['#4CAF50', '#FF9800'],
        hoverOffset: 4,
      },
    ],
  }

  // Pie chart data for task priority distribution
  const pieData = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        data: [
          highPriorityTasks.length,
          mediumPriorityTasks.length,
          lowPriorityTasks.length,
        ],
        backgroundColor: ['#F44336', '#FFEB3B', '#8BC34A'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="flex flex-col sm:flex-row gap-8 mb-8">
      {/* Doughnut Chart for Task Completion vs Remaining */}
      <div className="chart-container w-full sm:w-80 h-80 sm:h-80 flex-shrink-0">
        <Doughnut data={doughnutData} options={{ responsive: true }} />
      </div>

      {/* Pie Chart for Task Priority Distribution */}
      <div className="chart-container w-full sm:w-80 h-80 sm:h-80 flex-shrink-0">
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  )
}

export default TaskOverview
