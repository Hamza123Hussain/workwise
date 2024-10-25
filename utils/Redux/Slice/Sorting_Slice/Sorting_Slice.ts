import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  TimeFrame: 'All',
  Status: 'All',
  Prirority: 'All',
}

export const SortSlice = createSlice({
  name: 'Select',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.TimeFrame = action.payload
    },
    setStatus: (state, action) => {
      state.Status = action.payload
    },
    setPriority: (state, action) => {
      state.Prirority = action.payload
    },
  },
})
export const { setTime, setStatus, setPriority } = SortSlice.actions
export default SortSlice.reducer
