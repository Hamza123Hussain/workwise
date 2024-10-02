import React from 'react'
import { TaskFormComponentProps } from '@/utils/TaskformInterface'
import TaskField from './TaskField'
import UserAssign from './UserAssign'
const TaskForm: React.FC<TaskFormComponentProps> = ({
  taskData,
  setTaskData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div>
      <TaskField
        Label="Task Name"
        name="name"
        value={taskData.name}
        handleChange={handleChange}
        type="text"
      />
      <TaskField
        Label="Description"
        name="description"
        value={taskData.description}
        handleChange={handleChange}
        type="text"
      />
      <TaskField
        Label="Due Date"
        name="dueDate"
        value={taskData.dueDate}
        handleChange={handleChange}
        type="date"
      />
      <TaskField
        Label="Priority Level"
        name="priority"
        handleChange={handleChange}
        value={taskData.priority}
        type="text"
      />
      <UserAssign value={taskData.assignedTo} handleChange={handleChange} />
    </div>
  )
}
export default TaskForm
