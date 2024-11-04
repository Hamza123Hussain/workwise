import React from 'react'
import { TaskFormComponentProps } from '@/utils/TaskformInterface'
import TaskField from './TaskField'
import UserAssign from './UserAssign'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
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
  const User = useSelector((state: RootState) => state.user)
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
        Label="Priority Level"
        name="priority"
        handleChange={handleChange}
        value={taskData.priority}
        type="text"
      />
      <TaskField
        Label="Task Type"
        name="TaskType"
        handleChange={handleChange}
        value={taskData.TaskType}
        type="text"
      />
      {taskData.TaskType === 'Other' && (
        <TaskField
          Label="Due Date"
          name="dueDate"
          value={taskData.dueDate}
          handleChange={handleChange}
          type="date"
        />
      )}
      {User.Email === 'octtoppus1@gmail.com' && (
        <UserAssign value={taskData.assignedTo} handleChange={handleChange} />
      )}
    </div>
  )
}
export default TaskForm
