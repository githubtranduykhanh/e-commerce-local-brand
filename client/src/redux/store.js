import { configureStore } from '@reduxjs/toolkit'
import appReducer from './features/app/appSlice'
import productReducer from './features/products/productSlice'
export const store = configureStore({
  reducer: {
    app: appReducer,
    products:productReducer
  },
})