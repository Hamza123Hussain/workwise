import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  TimeFrame: 'All',
  Status: 'All',
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
  },
})
export const { setTime, setStatus } = SortSlice.actions
export default SortSlice.reducer
