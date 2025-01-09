import { Kpi } from '@/utils/Interfaces/KPIInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState: Kpi = {
  UserId: '',
  UserEmail: '',
  UserName: '',
  Targets: [],
  PointsGained: 0,
  TotalPoints: 0,
  createdAt: undefined,
  updatedAt: undefined,
}
export const UserKpiSlice = createSlice({
  name: 'UserKpi',
  initialState,
  reducers: {
    // Action to set the UserKpi data
    setUserKpi: (state, action: PayloadAction<Kpi>) => {
      return { ...action.payload }
    },
    // Action to clear/reset the UserKpi data
    clearUserKpi: () => {
      return { ...initialState }
    },
    // Action to update specific fields within the UserKpi
    updateUserKpi: (state, action: PayloadAction<Partial<Kpi>>) => {
      return { ...state, ...action.payload }
    },
  },
})
export const { setUserKpi, clearUserKpi, updateUserKpi } = UserKpiSlice.actions
export default UserKpiSlice.reducer
