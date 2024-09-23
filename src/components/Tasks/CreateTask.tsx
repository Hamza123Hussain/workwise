import React, { useState } from 'react'
import { createTask } from '../../functions/Task/CreateTask'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import TaskForm from './TaskForm'
const CreateTaskForm = () => {
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [name, setName] = useState('')
  const User = useSelector((state: RootState) => state.user)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const taskData = {
      description,
      dueDate,
      assignedTo,
      name,
      Email: User.Email,
    }
    try {
      const response = await createTask(taskData)
      console.log('response', response)
    } catch (error) {
      console.log('Error in frontend', error)
    }
  }
  return (
    <div className="min-h-screen bg-[#333333] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-[#FF9A8B] text-center">
          Create a New Task
        </h1>
        <form onSubmit={handleSubmit}>
          <TaskForm
            name={name}
            description={description}
            dueDate={dueDate}
            assignedTo={assignedTo}
            setName={setName}
            setDescription={setDescription}
            setDueDate={setDueDate}
            setAssignedTo={setAssignedTo}
          />
          <button
            type="submit"
            className="w-full bg-[#FF9A8B] text-white p-3 rounded-lg shadow hover:bg-[#ff7a6d] transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  )
}
export default CreateTaskForm
