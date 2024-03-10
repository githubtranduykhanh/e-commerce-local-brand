import axios from "axios";
import { apiGetRefreshToken } from "./apis/user";



const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let localStorageToken = window.localStorage.getItem('persist:shop/user')
    if(localStorageToken && typeof localStorageToken === 'string'){  
      localStorageToken = JSON.parse(JSON.parse(localStorageToken)?.token)
      if(localStorageToken !== 'null') {
        config.headers = {authorization:`Bearer ${localStorageToken}`}
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(!error.response.data?.success && error.response.data?.mes === 'Invalid access token'){
      const localStorage = window.localStorage
      let localStorageToken = localStorage.getItem('persist:shop/user')  
      apiGetRefreshToken().then((data) => {
          if(data?.sucess) {
              if(localStorageToken && typeof localStorageToken === 'string'){
                  localStorageToken = JSON.parse(localStorageToken)
                  localStorageToken = {...localStorageToken,token:JSON.stringify(data?.newAccessToken)}
                  localStorage.removeItem('persist:shop/user')
                  localStorage.setItem('persist:shop/user',JSON.stringify(localStorageToken))
              }
          }
          else {
              if(localStorageToken && typeof localStorageToken === 'string'){
                  localStorageToken = JSON.parse(localStorageToken)
                  localStorageToken = {current:null,isLogin:false,token:null}
                  localStorage.removeItem('persist:shop/user')
                  localStorage.setItem('persist:shop/user',JSON.stringify(localStorageToken))
              }
          }
        }).catch((error) => {
            if(localStorageToken && typeof localStorageToken === 'string'){
              localStorageToken = JSON.parse(localStorageToken)
              localStorageToken = {current:null,isLogin:false,token:null}
              localStorage.removeItem('persist:shop/user')
              localStorage.setItem('persist:shop/user',JSON.stringify(localStorageToken))
            }
            console.log('error',error)
        })
    }
    return error.response.data;
  }
);

export default instance;
