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
  },
})

// Export actions for use in components
export const { setTasks, setOpen, clearTasks, addTask } = UserTasksSlice.actions
