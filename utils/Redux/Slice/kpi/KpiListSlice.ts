import { Kpi } from '@/utils/Interfaces/KPIInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define the initial state as an array of Kpi objects
const initialState: Kpi[] = []
export const KpiListSlice = createSlice({
  name: 'KpiList',
  initialState,
  reducers: {
    // Add a single Kpi to the array
    addKpi: (state, action: PayloadAction<Kpi>) => {
      state.push(action.payload)
    },
    // Update a specific Kpi in the array
    updateKpi: (state, action: PayloadAction<Kpi>) => {
      const index = state.findIndex(
        (kpi) => kpi.UserId === action.payload.UserId
      )
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    // Remove a Kpi from the array using its UserId
    removeKpi: (state, action: PayloadAction<string>) => {
      return state.filter((kpi) => kpi.UserId !== action.payload)
    },
    // Set the entire array of Kpis
    setKpis: (state, action: PayloadAction<Kpi[]>) => {
      return action.payload
    },
    // Clear the Kpi list
    clearKpis: () => {
      return []
    },
  },
})
// Export actions
export const { addKpi, updateKpi, removeKpi, setKpis, clearKpis } =
  KpiListSlice.actions
// Export reducer
export default KpiListSlice.reducer
