import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../user/userActions'


export const userSlice = createSlice({
  name: 'user',
  initialState : {
    isLogin:false,
    token:null,
    current:null,
    isLoading:false,
    errorMessage:''
  },
  reducers: {
      login: (state, action) => {
        state.isLogin = action.payload.isLogin
        state.token = action.payload.accessToken
        state.current = action.payload.userData
      },
      logout: (state) => {
        state.isLogin = false
        state.token = null
        state.current = null
      },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.postLogin.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(actions.postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.token = action.payload.accessToken
      state.current = action.payload.userData
    })

    builder.addCase(actions.postLogin.rejected, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.errorMessage = action.error.message;
    })

    //Get Current

    builder.addCase(actions.getCurrent.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload.rs
    })

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      if(!action.payload?.success && action.payload?.mes === 'Invalid access token'){
        console.log(action)
        state.current = null
        state.isLogin = false
        state.token = null
      }
      state.isLoading = false;
      state.errorMessage = action.error.message;
    })
  }
})

export const { login,logout } = userSlice.actions

export default userSlice.reducer