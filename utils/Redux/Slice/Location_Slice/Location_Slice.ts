import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latitude: 0,
  longitude: 0,
}

export const Location_Slice = createSlice({
  name: 'Location_Slice',
  initialState,
  reducers: {
    New_Location_Cords: (state, action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const { New_Location_Cords } = Location_Slice.actions
export default Location_Slice.reducer
