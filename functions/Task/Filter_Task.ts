import { TaskFetch } from '@/utils/TaskformInterface'

export const filteredTasks = (
  allTasks: TaskFetch[],
  statusFilter: string,
  timeFilter: string,
  priorityFilter: string
) =>
  allTasks.filter((task) => {
    const matchesTimeFilter =
      timeFilter === 'All' || task.TaskType === timeFilter
    const matchesStatusFilter =
      statusFilter === 'All' || task.progress === statusFilter
    const matchesPriorityFilter =
      priorityFilter === 'All' || task.priority === priorityFilter
    return matchesTimeFilter && matchesStatusFilter && matchesPriorityFilter
  })
