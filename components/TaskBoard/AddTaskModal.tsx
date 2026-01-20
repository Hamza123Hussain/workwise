import { RootState } from '@/utils/Redux/Store/Store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
type TaskFormData = {
  name: string
  description: string
  assignedTo: string
  priority: 'Low' | 'Medium' | 'High' | ''
  dueDate: string
}

const AddTaskModal = ({
  open,
  onClose,
  onSubmit,
  initialData, // ✅ add this line
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
  initialData?: TaskFormData // ✅ make it optional
}) => {
  const currentUser = useSelector((state: RootState) => state.user)
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || {
      name: '',
      description: '',
      assignedTo: '',
      priority: 'Medium',
      dueDate: '',
    },
  )

  useEffect(() => {
    if (initialData) setFormData(initialData)
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    const { name, description, assignedTo, dueDate } = formData

    if (!name.trim()) return alert('Task name is required')
    if (!description.trim()) return alert('Task description is required')
    if (!assignedTo) return alert('Please select a user')
    if (!dueDate) return alert('Please select a due date')

    onSubmit(formData)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? 'Update Task' : 'Add Task'}
        </h3>
        {/* Task Name */}
        <input
          name="name"
          placeholder="Task Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2"
        />
        {/* Task Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2"
          rows={3}
        />
        {initialData ? (
          ''
        ) : (
          <>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="mb-3 w-full rounded border px-3 py-2"
            >
              <option value="">Select User</option>
              <option value={currentUser.Name}>{currentUser.Name}</option>
            </select>
            {/* Priority */}
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mb-3 w-full rounded border px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {/* Due Date */}
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </>
        )}
        <div className="flex justify-end gap-2">
          <button
            className=" rounded-sm p-2 bg-black text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className=" rounded-sm p-2 bg-green-400 text-white"
            onClick={handleAdd}
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskModal
