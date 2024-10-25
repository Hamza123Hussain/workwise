import { TaskFetch } from '@/utils/TaskformInterface'

export const filteredTasks = (
  allTasks: TaskFetch[],
  timeFilter: string,
  statusFilter: string
) =>
  allTasks.filter((task) => {
    const matchesTimeFilter =
      timeFilter === 'All' || task.TaskType === timeFilter
    const matchesStatusFilter =
      statusFilter === 'All' || task.progress === statusFilter
    return matchesTimeFilter && matchesStatusFilter
  })
