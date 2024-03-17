import axios from '../axios'

export const apiGetProduct = (params) => axios({
    url:'/product/',
    method:'get',
    params
})


export const apiGetProductByid = (pid) => axios({
    url:`/product/${pid}`,
    method:'get',
})

export const apiPostRatings = (data) => axios({
    url:`/product/ratings`,
    method:'post',
    data
})


export const apiPostCreateProduct = (data) => axios({
    url:`/product/`,
    method:'post',
    data
})


export const apiDeleteProduct = (pid) => axios({
    url:`/product/${pid}`,
    method:'delete',
})


export const apiPutUpdateProduct = (data,pid) => axios({
    url:`/product/${pid}`,
    method:'put',
    data
})

export const apiPutVarriantProduct = (data,pid) => axios({
    url:`/product/varriant/${pid}`,
    method:'put',
    data
})