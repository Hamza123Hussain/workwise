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
    updateTask(state, action: PayloadAction<RoleTask>) {
      // Updates a task based on the task ID
      const updatedTask = action.payload
      const taskIndex = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      )
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask // Update the task with new details
      }
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
  updateTask,
} = UserTasksSlice.actions
