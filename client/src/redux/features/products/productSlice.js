import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../products/productActions'


export const productSlice = createSlice({
  name: 'products',
  initialState : {
    newProduct:null,
    isLoading:false,
    errorMessage:''
  },
  reducers: {
    
  },
  extraReducers: (builder) => {

    builder.addCase(actions.getNewProducts.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProduct = action.payload;
    })

    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.errorMessage = action.error.message;
    })
  }
})

export default productSlice.reducer