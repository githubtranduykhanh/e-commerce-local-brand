import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../../apis'

export const postRegister = createAsyncThunk('user/registerssss',async(data,{rejectWithValue}) => {
    const response = await apis.apiRegister(data)
    if(!response.sucess) return rejectWithValue(response)
    return response
})

export const postLogin = createAsyncThunk('user/login',async(data,{rejectWithValue}) => {
    const response = await apis.apiRegister(data)
    if(!response.sucess) return rejectWithValue(response)
    return response
})