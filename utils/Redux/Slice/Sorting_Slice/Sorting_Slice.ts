import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  TimeFrame: 'All',
  Status: 'All',
  Priority: 'All', // Fixed typo from 'Prirority' to 'Priority'
  Month: new Date().getMonth(),
  Year: new Date().getFullYear(), // Added Year state
  MonthFlag: false,
  YearFlag: false,
  PriorityFlag: false,
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
      state.PriorityFlag = true
      state.Priority = action.payload
    },
    setMonth: (state, action) => {
      state.MonthFlag = true
      state.Month = action.payload
    },
    setYear: (state, action) => {
      state.YearFlag = true
      state.Year = action.payload // New reducer for setting the Year
    },
    ResetFlags: (state) => {
      state.YearFlag = false
      state.MonthFlag = false
      state.PriorityFlag = false
    },
  },
})

export const {
  setTime,
  setStatus,
  setPriority,
  setMonth,
  setYear,
  ResetFlags,
} = SortSlice.actions
export default SortSlice.reducer
