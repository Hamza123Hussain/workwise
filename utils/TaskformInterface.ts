export interface TaskFormProps {
  name: string
  description: string
  dueDate: string
  assignedTo: string[]
  Email: string
  priority: string
  TaskType: string
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
  TaskType: 'Daily' | 'Weekly' | 'Other'
}
export const priorityClass = (task: TaskFetch) => {
  return task.priority === 'HIGH'
    ? 'bg-red-600'
    : task.priority === 'MEDIUM'
    ? 'bg-purple-500'
    : 'bg-green-600'
}

export interface EditTask {
  task: TaskFetch
  progress: string
  setProgress: (progress: string) => void
  priority: string
  setPriority: (priority: string) => void
  Email: string
  description: string
  setDescription: (description: string) => void
}
// Define types for the task data
export interface TaskData {
  description: string
  dueDate: string
  assignedTo: string[] // Updated to array of strings
  name: string
  Email: string
  priority: string
  TaskType: string
}
