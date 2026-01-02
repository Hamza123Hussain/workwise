'use client'

import React, { useState } from 'react'

import toast from 'react-hot-toast'

const AddTaskModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (description: string) => void
}) => {
  const [description, setDescription] = useState('')

  const handleAdd = () => {
    if (!description.trim()) return toast.error('Enter a task')
    onSubmit(description)
    setDescription('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 ">Add Task</h3>
        <input
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 border-2 border-gray-400 w-full rounded-lg px-2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className=" rounded-md px-2 bg-black text-white"
          >
            Cancel
          </button>
          <button
            className="rounded-md px-2 bg-black text-white"
            onClick={handleAdd}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskModal
