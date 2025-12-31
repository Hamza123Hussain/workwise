import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import { setTasks } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import Taskcard from '../DashBoard/UserTasks/Taskcard'
import TaskLoader from '@/components/Task/TaskLoader'
import { getUserTasks } from '@/functions/UserTasks/GetUserTasks'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { Allusers } from '@/functions/AUTH/Allusers'

const TasksFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const User = useSelector((state: RootState) => state.user)
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const tasks = useSelector((state: RootState) => state.userTaskSlice.tasks)

  const [Loading, SetLoading] = useState(false)
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )

  // Fetch all users
  const GetUsers = async () => {
    try {
      SetLoading(true)
      const Data = await Allusers(User.Email)
      if (Data) {
        SetUserFetched(Data)
      }
    } finally {
      SetLoading(false)
    }
  }

  useEffect(() => {
    GetUsers()
  }, [User])

  // Filter tasks based on selected month, year, and user
  const filterTasks = (tasks: RoleTask[]) => {
    return tasks.filter((task) => {
      if (!task.DueDate) return false
      const due = new Date(task.DueDate)
      const matchMonth = due.getMonth() === selectedMonth
      const matchYear = due.getFullYear() === selectedYear
      const matchUser = SelectedUser ? task.UserEmail === SelectedUser : true
      return matchMonth && matchYear && matchUser
    })
  }

  const fetchTasks = async () => {
    try {
      SetLoading(true)
      const TasksFetched = await getUserTasks(User._id)
      if (TasksFetched) {
        const FilteredTasks = filterTasks(TasksFetched)
        dispatch(setTasks(FilteredTasks))
      }
    } finally {
      SetLoading(false)
    }
  }

  useEffect(() => {
    if (User) fetchTasks()
  }, [SelectedUser, selectedMonth, selectedYear, User])

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(GetUserName(event.target.value))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        {/* User Dropdown */}
        <div className="flex flex-col">
          <label className="font-medium text-[#ac58ff]">Select User</label>
          <select
            value={SelectedUser || ''}
            onChange={handleUserChange}
            className="border-2 border-white text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          >
            <option value="">All Users</option>
            {Users.map((user) => (
              <option key={user.createdAt} value={user.Email}>
                {user.Name === 'Arooj'
                  ? 'Arooj Yousaf'
                  : user.Name === 'Salman'
                  ? 'Salman Haider'
                  : user.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div className="flex flex-col">
          <label className="font-medium text-[#ac58ff]">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border-2 border-white text-white p-2 rounded-lg bg-[#a56edd]"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="flex flex-col">
          <label className="font-medium text-[#ac58ff]">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border-2 border-white text-white p-2 rounded-lg bg-[#a56edd]"
          >
            {Array.from(
              { length: 5 },
              (_, i) => new Date().getFullYear() - 2 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task List */}
      {Loading ? (
        <TaskLoader />
      ) : tasks.length === 0 ? (
        <p className="text-white">No tasks found for selected filters</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
          {tasks.map((task) => (
            <Taskcard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TasksFilter
