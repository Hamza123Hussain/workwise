'use client'

import React, { useEffect, useState } from 'react'

import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import AddTaskModal from './AddTaskModal'
import TaskList from './TaskList'
import { getTasksGroupedByDate } from '@/functions/Task/AllTasksBoard'
import { addTask } from '@/functions/Task/AddTaskBoard'

const TaskBoardPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])

  const currentUser = useSelector((state: RootState) => state.user)

  const fetchTasks = async () => {
    try {
      const grouped = await getTasksGroupedByDate()

      // today's date key
      const todayKey = new Date().toISOString().split('T')[0]
      setTasks(grouped[todayKey] || [])
    } catch {
      toast.error('Failed to fetch tasks')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (description: string) => {
    try {
      await addTask(description, currentUser.Name, currentUser.Email)
      toast.success('Task added!')
      setModalOpen(false)
      fetchTasks() // ⬅ refresh immediately
    } catch {
      toast.error('Could not add task')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <Header date={new Date()} onAdd={() => setModalOpen(true)} />

      {/* Modal */}
      {modalOpen && (
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}

      {/* Task List */}
      <TaskList tasks={tasks} />
    </div>
  )
}

export default TaskBoardPage

// Header Component
const Header = ({ date, onAdd }: { date: Date; onAdd: () => void }) => {
  const currentDateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">{currentDateStr}</h2>
      <button className="flex items-center gap-2" onClick={onAdd}>
        <Plus size={18} /> Add Task
      </button>
    </div>
  )
}
