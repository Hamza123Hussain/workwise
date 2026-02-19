'use client'
import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import axios from 'axios'

import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { getTasksGroupedByDate } from '@/functions/Task/AllTasksBoard'
import { addTask } from '@/functions/Task/AddTaskBoard'
import { updateTask } from '@/functions/Task/UpdateTaskBoard'
import { deleteTask } from '@/functions/Task/DeleteTaskBoard'
import { updateTaskStatus } from '@/functions/Task/UpdateTaskStatus'

type TaskFormData = {
  name: string
  description: string
  assignedTo: string
  priority: any
  dueDate: string
  type?: string
}

const TaskBoardPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tasksByDate, setTasksByDate] = useState<Record<string, any[]>>({})
  const [editTask, setEditTask] = useState<any>(null)
  const [deleteTaskData, setDeleteTaskData] = useState<any>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>('all')

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
        ...taskData,
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

  const handleUpdateStatus = async (task: any, status: string) => {
    try {
      await updateTaskStatus(task._id, status, currentUser._id, task.type)
      toast.success('Status updated!')

      const updatedTasks = { ...tasksByDate }
      Object.keys(updatedTasks).forEach((date) => {
        updatedTasks[date] = updatedTasks[date].map((t) =>
          t._id === task._id ? { ...t, status } : t,
        )
      })
      setTasksByDate(updatedTasks)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleUpdatePosting = async (
    task: any,
    platform: string,
    status: boolean,
  ) => {
    try {
      await axios.put(
        `https://crm-backend-wcpj.vercel.app/Api/TaskBoard/UpdatePosting?taskId=${task._id}`,
        { platform, status },
      )
      toast.success(`${platform} updated!`)

      const updatedTasks = { ...tasksByDate }
      Object.keys(updatedTasks).forEach((date) => {
        updatedTasks[date] = updatedTasks[date].map((t) => {
          if (t._id === task._id) {
            return {
              ...t,
              Posting: t.Posting.map((p: any) =>
                p.Name === platform ? { ...p, Status: status } : p,
              ),
            }
          }
          return t
        })
      })
      setTasksByDate(updatedTasks)
    } catch {
      toast.error('Failed to update posting')
    }
  }

  // FIXED: Corrected filtering logic and syntax
  const filterTasksByUser = (tasks: any[]) => {
    if (currentUser.Name === 'Hamza Hussain') {
      if (selectedUser === 'all') return tasks
      return tasks.filter((task) => task.assignedTo === selectedUser)
    }
    return tasks.filter((task) => task.assignedTo === currentUser.Name)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header onAdd={() => setModalOpen(true)} />

      {currentUser.Name === 'Hamza Hussain' && (
        <div className="mb-6 flex justify-end">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Users</option>
            <option value="Hamza Hussain">Hamza Hussain</option>
            <option value="Waqas Ali">Waqas Ali</option>
            <option value="Inza Riaz">Inza Riaz</option>
            <option value="Saad Ali">Saad Ali</option>
          </select>
        </div>
      )}

      {modalOpen && (
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}

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
            type: editTask.type,
          }}
          onSubmit={handleUpdateTask}
        />
      )}

      {deleteModalOpen && deleteTaskData && (
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteTask}
        />
      )}

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
                  onUpdateStatus={handleUpdateStatus}
                  onUpdatePosting={handleUpdatePosting}
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

// FIXED: Moved Header outside the main component scope
const Header = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex justify-between items-center mb-6">
    <button
      className="flex items-center gap-2 rounded-sm p-2 bg-black text-white hover:bg-gray-800 transition-colors"
      onClick={onAdd}
    >
      <Plus size={18} /> Add Task
    </button>
  </div>
)

export default TaskBoardPage
