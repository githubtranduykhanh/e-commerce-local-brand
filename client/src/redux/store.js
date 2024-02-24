import { configureStore } from '@reduxjs/toolkit'
import appReducer from './features/app/appSlice'
import productReducer from './features/products/productSlice'
import userReducer from './features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';



const commonConfig = {
  key: 'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist:['isLogin','token']
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    products:productReducer,
    user: persistReducer(userConfig, userReducer)
  },
  middleware: getDefaultMiddleware =>getDefaultMiddleware({serializableCheck: false,})
})


export const persistor = persistStore(store)