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
      register: (state, action) => {
        state.isLogin = action.payload.isLogin
        state.token = action.payload.accessToken
        state.current = action.payload.userData
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
  }
})

export const { register } = userSlice.actions

export default userSlice.reducer