'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'

import TaskList from './TaskList'
import { getTasksGroupedByDate } from '@/functions/Task/GetTasksTaskBoard'
import { addTask } from '@/functions/Task/AddTaskBoard'
import { updateTask } from '@/functions/Task/UpdateTaskBoard'
import AddTaskModal from './AddTaskModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { deleteTask } from '@/functions/Task/DeleteTaskBoard'
import { completeTask } from '@/functions/Task/CompleteTask'

type TaskFormData = {
  name: string
  description: string
  assignedTo: string
  priority: 'Low' | 'Medium' | 'High' | ''
  dueDate: string
}

const TaskBoardPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tasksByDate, setTasksByDate] = useState<Record<string, any[]>>({})
  const [editTask, setEditTask] = useState<any>(null)
  const [deleteTaskData, setDeleteTaskData] = useState<any>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const currentUser = useSelector((state: RootState) => state.user)

  const fetchTasks = async () => {
    try {
      const grouped = await getTasksGroupedByDate()
      setTasksByDate(grouped)
    } catch {
      toast.error('Failed to fetch tasks')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (taskData: TaskFormData) => {
    try {
      await addTask({
        name: taskData.name,
        description: taskData.description || '',
        assignedTo: taskData.assignedTo,
        priority: taskData.priority as 'Low' | 'Medium' | 'High',
        dueDate: taskData.dueDate,
        createdBy: currentUser.Name,
        email: currentUser.Email,
      })
      toast.success('Task added!')
      setModalOpen(false)
      fetchTasks()
    } catch {
      toast.error('Could not add task')
    }
  }

  const handleUpdateTask = async (updatedData: TaskFormData) => {
    if (!editTask) return
    try {
      await updateTask(editTask._id, updatedData)
      toast.success('Task updated!')
      setEditTask(null)
      fetchTasks()
    } catch {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async () => {
    if (!deleteTaskData) return
    try {
      await deleteTask(deleteTaskData._id)
      toast.success('Task deleted!')
      setDeleteModalOpen(false)
      setDeleteTaskData(null)
      fetchTasks()
    } catch {
      toast.error('Failed to delete task')
    }
  }

  const handleCompleteTask = async (task: any) => {
    try {
      await completeTask(task._id, true)
      toast.success('Task marked as completed!')
      fetchTasks()
    } catch {
      toast.error('Failed to mark task as completed')
    }
  }

  // **New: Update status**
  const handleUpdateStatus = async (task: any, status: string) => {
    try {
      // await updateTask(task._id,  status ) // update status in backend
      toast.success('Status updated!')
      if (status === 'Completed' && !task.completed) {
        await handleCompleteTask(task)
      } else {
        fetchTasks()
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const filterTasksByUser = (tasks: any[]) => {
    return tasks.filter((task) => task.assignedTo === currentUser.Name)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <Header onAdd={() => setModalOpen(true)} />

      {/* Add Task Modal */}
      {modalOpen && (
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}

      {/* Update Task Modal */}
      {editTask && (
        <AddTaskModal
          open={!!editTask}
          onClose={() => setEditTask(null)}
          initialData={{
            name: editTask.name,
            description: editTask.description,
            assignedTo: editTask.assignedTo,
            priority: editTask.priority,
            dueDate: editTask.dueDate.slice(0, 10),
          }}
          onSubmit={handleUpdateTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && deleteTaskData && (
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteTask}
        />
      )}

      {/* Task Lists by Date */}
      {Object.keys(tasksByDate).length > 0 ? (
        Object.keys(tasksByDate)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((date) => {
            const filteredTasks = filterTasksByUser(tasksByDate[date])
            if (filteredTasks.length === 0) return null

            return (
              <div
                key={date}
                className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h3>

                <TaskList
                  tasks={filteredTasks}
                  onEdit={(task) => setEditTask(task)}
                  onDelete={(task) => {
                    setDeleteTaskData(task)
                    setDeleteModalOpen(true)
                  }}
                  onComplete={handleCompleteTask}
                  onUpdateStatus={handleUpdateStatus} // propagate status update
                />
              </div>
            )
          })
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  )
}

export default TaskBoardPage

// Header Component
const Header = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <button
      className="flex items-center gap-2 rounded-sm p-2 bg-black text-white"
      onClick={onAdd}
    >
      <Plus size={18} /> Add Task
    </button>
  </div>
)
