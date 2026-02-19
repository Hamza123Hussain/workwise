'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchRoleBasedTasks } from '@/functions/UserTasks/GetRoleBasedTask'
import { RootState } from '@/utils/Redux/Store/Store'
import TaskTypeSelect, { TaskFormData } from './TaskTypeSelect'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
  initialData?: TaskFormData
}

const EMPTY_FORM: TaskFormData = {
  name: '',
  description: '',
  assignedTo: '',
  priority: '',
  dueDate: '',
  type: '',
}

const AddTaskModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const currentUser = useSelector((state: RootState) => state.user)
  const [userTasks, setUserTasks] = useState<any[]>([])
  const [formData, setFormData] = useState<TaskFormData>({
    ...(initialData ?? EMPTY_FORM),
    assignedTo: initialData?.assignedTo ?? currentUser?.Name ?? '',
  })

  // Sync form when initialData changes (editing)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Set default assignedTo for new tasks
  useEffect(() => {
    if (!initialData && currentUser?.Name && !formData.assignedTo) {
      setFormData((prev) => ({
        ...prev,
        assignedTo: currentUser.Name,
      }))
    }
  }, [currentUser?.Name, initialData, formData.assignedTo])

  // Fetch role-based tasks for the dropdown logic
  useEffect(() => {
    const getUserTasks = async () => {
      try {
        if (!currentUser?._id) return
        const data = await fetchRoleBasedTasks(currentUser._id)
        if (data) setUserTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    getUserTasks()
  }, [currentUser?._id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTaskTypeChange = (type: string) => {
    const selectedTask = userTasks.find((task) => task.TaskName === type)
    setFormData((prev) => ({
      ...prev,
      type,
      priority: selectedTask?.Priority ?? prev.priority,
      totalPoints: selectedTask?.TotalPoints,
    }))
  }

  const handleSubmit = () => {
    const { name, description, assignedTo, dueDate } = formData
    if (!name.trim()) return alert('Task name is required')
    if (!description.trim()) return alert('Task description is required')
    if (!assignedTo) return alert('Assigned user missing')
    if (!dueDate) return alert('Please select a due date')

    onSubmit(formData)
    onClose()
  }

  if (!open) return null

  const isAdmin = currentUser?.Name === 'Hamza Hussain'

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-black">
          {initialData ? 'Update Task' : 'Add Task'}
        </h3>

        {/* Task Name */}
        <input
          name="name"
          placeholder="Task Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 text-black"
        />

        {/* Task Type */}
        <TaskTypeSelect
          value={formData.type || ''}
          tasks={userTasks}
          onChange={handleTaskTypeChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 text-black"
          rows={3}
        />

        {/* Assignment Logic */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Assigned To
          </label>
          {isAdmin ? (
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 text-sm text-black"
            >
              <option value="Hamza Hussain">Hamza Hussain</option>
              <option value="Waqas Ali">Waqas Ali</option>
              <option value="Inza Riaz">Inza Riaz</option>
              <option value="Saad Ali">Saad Ali</option>
            </select>
          ) : (
            <input
              name="assignedTo"
              value={formData.assignedTo}
              disabled
              className="w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed text-black"
            />
          )}
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Priority (Set by Task Type)
          </label>
          <select
            name="priority"
            value={formData.priority}
            disabled
            className="w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed text-black"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            onClick={handleSubmit}
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskModal
