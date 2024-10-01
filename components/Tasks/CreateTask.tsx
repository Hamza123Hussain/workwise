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
  const [Priority, setPriority] = useState('LOW')
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
    <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full mx-auto my-5">
      <h1 className="text-2xl font-bold mb-6 text-purple-400 text-center">
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
          Priority={Priority}
          setPriority={setPriority}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg shadow hover:bg-purple-500 transition duration-300"
        >
          Create Task
        </button>
      </form>
    </div>
  )
}
export default CreateTaskForm
