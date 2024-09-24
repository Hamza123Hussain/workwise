import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from '../Slice/User/UserSlice' // Adjust the import path accordingly

const Store = configureStore({
  reducer: {
    user: UserSlice.reducer, // Add UserSlice reducer here
  },
})

export default Store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {some: SomeStateType}
export type AppDispatch = typeof Store.dispatch