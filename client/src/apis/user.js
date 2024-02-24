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
    data
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