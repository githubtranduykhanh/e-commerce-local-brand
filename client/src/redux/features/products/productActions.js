import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../../apis'

export const getNewProducts = createAsyncThunk('products/newProducts',async(data,{rejectWithValue}) => {
    const response = await apis.apiGetProduct({sort:'-createAt'})
    if(!response.success) return rejectWithValue(response)
    return response.productDatas
})