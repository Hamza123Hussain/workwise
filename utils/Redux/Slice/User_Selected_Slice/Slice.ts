import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state
interface UserState {
  id: string | null
  name: string | null
}

const initialState: UserState = {
  id: '',
  name: '',
}

// Create the user slice
export const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState,
  reducers: {
    // Action to set user details
    setUser: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id
      state.name = action.payload.name
    },
    // Action to remove user details
    removeUser: (state) => {
      state.id = ''
      state.name = ''
    },
  },
})

// Export actions
export const { setUser, removeUser } = userSlice.actions
