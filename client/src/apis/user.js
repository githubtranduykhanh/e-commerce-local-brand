import axios from '../axios'

export const apiRegister = (data) => axios({
    url:'/user/register',
    method:'post',
    data,
    withCredentials:true //Lưu cookie trên trình duyệt cùng với cấu hình credentials:true server
})

export const apiLogin = (data) => axios({
    url:'/user/login',
    method:'post',
    data,
    withCredentials:true //Lưu cookie trên trình duyệt cùng với cấu hình credentials:true server
})

export const apiForgotPassword = (data) => axios({
    url:'/user/forgotpasswordemail',
    method:'post',
    data
})


export const apiResetpassword = (data) => axios({
    url:'/user/resetpassword',
    method:'put',
    data
})

export const apiGetRefreshToken = () => axios({
    url:'/user/refreshtoken',
    method:'get',
    withCredentials:true
})

export const apiGetCurrent = () => axios({
    url:'/user/current',
    method:'get',
})

export const apiGetUsers = (params) => axios({
    url:'/user/',
    method:'get',
    params
})

export const apiUpdateUser = (data,uid) => axios({
    url:'/user/'+ uid,
    method:'put',
    data
})

export const apiDeleteUser = (uid) => axios({
    url:'/user/'+ uid,
    method:'delete',
})

export const apiPutCurrent = (data) => axios({
    url:'/user/current',
    method:'put',
    data
})