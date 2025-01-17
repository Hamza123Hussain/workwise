import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface' // Task interface
// Define the initial state
interface UserTaskState {
  tasks: RoleTask[] // List of tasks
  open: boolean // Loading state
}
const initialState: UserTaskState = {
  tasks: [],
  open: false,
}
// UserTask slice
export const userTaskSlice = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    setopen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setTasks: (state, action: PayloadAction<RoleTask[]>) => {
      state.tasks = action.payload
    },
    clearTasks: (state) => {
      state.tasks = []
    },
    AddTask: (state, action) => {
      state.tasks.push(action.payload)
    },
  },
})
// Export actions
export const { setopen, setTasks, clearTasks } = userTaskSlice.actions
