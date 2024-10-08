export interface TaskFormProps {
  name: string
  description: string
  dueDate: string
  assignedTo: string
  Email: string
  priority: string
}
export interface TaskFormComponentProps {
  taskData: TaskFormProps
  setTaskData: React.Dispatch<React.SetStateAction<TaskFormProps>>
}

export interface TaskFieldProps {
  Label: string
  name: string
  value: string
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
  type: 'text' | 'date' // To dynamically set the input type (text, date, etc.)
}
export interface TaskFetch {
  TaskCompletion: number
  _id: string
  assignedTo: string // User to whom the task is assigned
  createdAt: string // Date when the task was created (ISO string)
  description: string // Brief description of the task
  dueDate: string // Due date for the task (ISO string)
  name: string // Name of the task
  priority: 'LOW' | 'MEDIUM' | 'HIGH' // Priority level of the task
  progress: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'Minor_progress' // Progress status of the task
}
export const priorityClass = (task: TaskFetch) => {
  return task.priority === 'HIGH'
    ? 'bg-red-600'
    : task.priority === 'MEDIUM'
    ? 'bg-purple-500'
    : 'bg-green-600'
}

export const progress_Class = (task: TaskFetch) => {
  return task.progress === 'TODO'
    ? 'bg-red-600'
    : task.progress === 'IN_PROGRESS'
    ? 'bg-purple-500'
    : 'bg-green-600'
}
