import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../app/appActions'


export const appSlice = createSlice({
  name: 'app',
  initialState : {
    categories: [],
    isLoading:false,
    errorMessage:'',
    isModalProfile:false,
    isModalDetail:false,
    detail:{}
  },
  reducers: {
      showModalProfile: (state) => {
        state.isModalProfile = true
      },
      closeModalProfile: (state) => {
        state.isModalProfile = false
      },
      showModalDetail: (state,action) => {
        state.isModalDetail = true
        state.detail = action.payload
      },
      closeModalDetail: (state) => {
        state.isModalDetail = false
        state.detail = {}
      },
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
export const { showModalProfile, closeModalProfile, showModalDetail, closeModalDetail  } = appSlice.actions
export default appSlice.reducer