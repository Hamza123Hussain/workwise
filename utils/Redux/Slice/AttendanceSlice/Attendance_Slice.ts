import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentTime: null as string | null, // ✅ Use string instead of Date
  checkinStatus: true,
  attendanceId: '',
  HoursWorked: 0,
}

export const AttedanceSlice = createSlice({
  name: 'Attedance',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<string>) => {
      state.currentTime = action.payload // ✅ Store as a string
    },
    ToggleCheckin: (state, action: PayloadAction<boolean>) => {
      state.checkinStatus = action.payload // ✅ Store as a string
    },
    SetAttendanceID: (state, action: PayloadAction<string>) => {
      state.attendanceId = action.payload // ✅ Store as a string
    },
    SetHoursWorked: (state, action: PayloadAction<number>) => {
      state.HoursWorked = action.payload // ✅ Store as a string
    },
    IncrementHoursWorked: (state, action: PayloadAction<number>) => {
      state.HoursWorked += action.payload // ✅ Store as a string
    },
  },
})

export const {
  setTime,
  ToggleCheckin,
  SetAttendanceID,
  SetHoursWorked,
  IncrementHoursWorked,
} = AttedanceSlice.actions
export default AttedanceSlice.reducer
