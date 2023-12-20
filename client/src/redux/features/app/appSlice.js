import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../app/appActions'


export const counterSlice = createSlice({
  name: 'app',
  initialState : {
    categories: [],
    isLoading:false,
    errorMessage:''
  },
  reducers: {
    
  },
  extraReducers: (builder) => {

    builder.addCase(actions.getCategories.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    })

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.errorMessage = action.error.message;
    })
  }
})

export default counterSlice.reducer