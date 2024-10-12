import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

export const SelectSlice = createSlice({
  name: 'Select',
  initialState,
  reducers: {
    GetUserName: (state, action) => {
      state = action.payload
    },
  },
})
export const { GetUserName } = SelectSlice.actions
export default SelectSlice.reducer
