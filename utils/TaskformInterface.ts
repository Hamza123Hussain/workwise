export interface TaskFormProps {
  name: string
  description: string
  dueDate: string
  assignedTo: string
  setName: (value: string) => void
  setDescription: (value: string) => void
  setDueDate: (value: string) => void
  setAssignedTo: (value: string) => void
  Priority: string
  setPriority: (value: string) => void
}
