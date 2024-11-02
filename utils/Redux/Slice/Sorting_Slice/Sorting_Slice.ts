import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  TimeFrame: 'All',
  Status: 'All',
  Prirority: 'All',
  Month: new Date().getMonth(),
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

    setMonth: (state, action) => {
      state.Month = action.payload
    },
  },
})
export const { setTime, setStatus, setPriority, setMonth } = SortSlice.actions
export default SortSlice.reducer
