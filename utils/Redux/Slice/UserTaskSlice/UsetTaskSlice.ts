// src/utils/Redux/Slices/UserTasksSlice.ts
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserTasksState {
  tasks: RoleTask[] // List of tasks
  open: boolean // Dialog open/close state
}

const initialState: UserTasksState = {
  tasks: [],
  open: false,
}

export const UserTasksSlice = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<RoleTask[]>) {
      // Sets the entire list of tasks
      state.tasks = action.payload
    },
    setOpen(state, action: PayloadAction<boolean>) {
      // Updates the dialog open/close state
      state.open = action.payload
    },
    clearTasks(state) {
      // Clears the task list
      state.tasks = []
    },
    addTask(state, action: PayloadAction<RoleTask>) {
      // Adds a single task to the list
      state.tasks.push(action.payload)
    },
    deleteTask(state, action: PayloadAction<string>) {
      // Deletes a task based on the task ID
      state.tasks = state.tasks.filter((task) => task._id !== action.payload)
    },
    CompleteTask(state, action) {
      const taskId = action.payload._id
      const taskIndex = state.tasks.findIndex((task) => task._id === taskId)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].Completed = action.payload.Completed
        state.tasks[taskIndex].PointsGained = state.tasks[taskIndex].TotalPoints
      }
    },
    filterByYear: (state, action) => {
      const selectedYear = action.payload // The year to filter
      state.tasks = state.tasks.filter((task) => {
        if (!task.createdAt) return false // Skip tasks without a valid date
        const taskYear = new Date(task.createdAt).getFullYear()
        return taskYear === selectedYear
      })
    },
    filterByMonth: (state, action) => {
      const selectedMonth = action.payload // Month (0-11) to filter

      state.tasks = state.tasks.filter((task) => {
        if (!task.createdAt) return false // Skip tasks without a valid date

        const taskMonth = new Date(task.createdAt).getMonth()
        return taskMonth === selectedMonth
      })
    },
    filterByPriority: (state, action) => {
      state.tasks = state.tasks.filter((task) => {
        if (!task.Priority) return false // Skip tasks without a valid date
        return task.Priority === action.payload
      })
    },
  },
})
// Export actions for use in components
export const {
  setTasks,
  setOpen,
  clearTasks,
  addTask,
  deleteTask,
  CompleteTask,
  filterByMonth,
  filterByPriority,
  filterByYear,
} = UserTasksSlice.actions
