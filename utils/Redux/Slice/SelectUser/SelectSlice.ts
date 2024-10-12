import { createSlice } from '@reduxjs/toolkit'
const initialState = 'Hamza Hussain'

export const SelectSlice = createSlice({
  name: 'Select',
  initialState,
  reducers: {
    GetUserName: (state, action) => {
      return action.payload
    },
  },
})
export const { GetUserName } = SelectSlice.actions
export default SelectSlice.reducer
