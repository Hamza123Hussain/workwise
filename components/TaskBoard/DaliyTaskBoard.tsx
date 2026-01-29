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
import { completeTask } from '@/functions/Task/CompleteTask'
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
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        createdBy: currentUser.Name,
        email: currentUser.Email,
        type: taskData.type,
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
      await completeTask(task._id, true, currentUser._id, task.type)
      toast.success('Task marked as completed!')
      // update locally
      fetchTasks()
    } catch {
      toast.error('Failed to mark task as completed')
    }
  }

  const handleUpdateStatus = async (task: any, status: string) => {
    try {
      await updateTaskStatus(task._id, status)
      toast.success('Status updated!')
      // update locally
      const updatedTasks = { ...tasksByDate }
      Object.keys(updatedTasks).forEach((date) => {
        updatedTasks[date] = updatedTasks[date].map((t) =>
          t._id === task._id ? { ...t, status } : t,
        )
      })
      setTasksByDate(updatedTasks)
    } catch (err) {
      console.error('Error updating task status:', err)
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
      // update locally immediately
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
    } catch (err) {
      console.error('Error updating posting:', err)
      toast.error('Failed to update posting')
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
            type: editTask.type,
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
