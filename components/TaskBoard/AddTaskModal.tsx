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
  priority: 'Medium',
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

  // Sync form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Ensure assignedTo is always current user (when creating)
  useEffect(() => {
    if (!initialData && currentUser?.Name) {
      setFormData((prev) => ({
        ...prev,
        assignedTo: currentUser.Name,
      }))
    }
  }, [currentUser?.Name, initialData])

  // Fetch role-based tasks
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

  // Task type → auto priority / points
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

        {/* Task Type */}
        <TaskTypeSelect
          value={formData.type}
          tasks={userTasks}
          onChange={handleTaskTypeChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2"
          rows={3}
        />

        {!initialData && (
          <>
            {/* Assigned To (Auto-filled & Disabled) */}
            <input
              name="assignedTo"
              value={formData.assignedTo}
              disabled
              className="mb-3 w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed"
            />

            {/* Priority (Auto-controlled & Disabled) */}
            <select
              name="priority"
              value={formData.priority}
              disabled
              className="mb-3 w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {/* Due Date */}
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mb-4 w-full rounded border px-3 py-2"
            />
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="p-2 bg-black text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded"
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
