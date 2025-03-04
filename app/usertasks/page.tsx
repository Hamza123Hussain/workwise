'use client'
import React, { useState } from 'react'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { RootState } from '@/utils/Redux/Store/Store'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserTasks } from '@/functions/Frontend/UserTasks'
import Empty_Task_Test from '@/components/Tasks/Empty_Task_Test'
import Loader from '@/components/Loader'
import Dropdowns from '@/components/Tasks/Dropdowns'
import { filteredTasks } from '@/functions/Task/Filter_Task'
import CreateTaskModal from '@/components/Tasks/ModalTask'
import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'

const UserTasks = () => {
  const [loading, setLoading] = useState(true)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const SortTask = useSelector((state: RootState) => state.sort)
  const user = useSelector((state: RootState) => state.user)
  const selectedUser = useSelector((state: RootState) => state.Select)

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchUserTasks(user.Name, user.Email, setLoading)
      setTasks(tasks)
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [selectedUser, user.Email, user.Name])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg my-10">
      <h2 className="font-semibold text-2xl text-[#8c5bff] mb-4">
        Tasks of {user.Name}
      </h2>

      {/* Create New Task Button */}
      <div className="mb-4 flex justify-end">
        <CreateTaskModal />
      </div>

      <Dropdowns />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {filteredTasks(
          allTasks,
          SortTask.Status,
          SortTask.TimeFrame,
          SortTask.Priority,
          SortTask.Month
        ).length > 0 ? (
          filteredTasks(
            allTasks,
            SortTask.Status,
            SortTask.TimeFrame,
            SortTask.Priority,
            SortTask.Month
          ).map((task) => <TaskCard2 key={task.createdAt} TaskDetail={task} />)
        ) : (
          <Empty_Task_Test />
        )}
      </div>
    </div>
  )
}

export default UserTasks
