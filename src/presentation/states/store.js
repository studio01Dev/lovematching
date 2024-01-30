import { configureStore } from '@reduxjs/toolkit'
import inputReducer from './features/input/inputSlice'

export default configureStore({
  reducer: {
    input: inputReducer
  },
})