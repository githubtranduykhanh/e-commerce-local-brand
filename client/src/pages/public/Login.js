import { Link } from "react-router-dom";
import path from "../../ultils/path";
import logo from "../../assets/logo.png";
import { Button, InputFiled } from "../../components";
import { useCallback, useState } from "react";
import { apiRegister,apiLogin } from "../../apis";
import {toast } from 'react-toastify';

const Login = () => {
    const [isRegister,setIsRegister] = useState(false)
    const [payload,setPayload] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        mobile:''
    })
    const handleSubmit = useCallback( async () => {
        const {firstname,lastname,mobile,...data} = payload
        if(isRegister){
            const res = await apiRegister(payload)
            res?.sucess  ?  toast.success("Success Notification !") : toast.error(res?.mes);
            console.log(res)
        }else{
            const res = await apiLogin(data)
            res.sucess ?  toast.success("Success Notification !") : toast.error("Error Notification !");
            console.log(res)
        } 
    },[payload,isRegister])
    const handleChaneLoginRegister = () => {
        setPayload({
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            mobile:''
        })
        setIsRegister(prev => !prev)
    }
    

    return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={`/${path.HOME}`}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="object-contain" src={logo} alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isRegister ? 'Register' : 'Sign in'} to your account
            </h1>
            {isRegister && 
                <>
                <div className="flex items-center gap-4">
                <div>
                    <label
                        htmlFor="firstname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        First Name
                    </label>
              
                    <InputFiled  value={payload.firstname} setValue={setPayload} nameKey='firstname' name='firstname' />
                </div>
                 <div>
                 <label
                     htmlFor="lastname"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                 >
                     Last Name
                 </label>
           
                 <InputFiled  value={payload.lastname} setValue={setPayload} nameKey='lastname' name='lastname' />
                </div>
                </div>
                <div>
                <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Mobile
                </label>
          
                <InputFiled  type='number' value={payload.mobile} setValue={setPayload} nameKey='mobile' name='mobile' />

            </div>
                </>
            }
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              
              <InputFiled type='email' value={payload.email} setValue={setPayload} nameKey='email' name='email' />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              
              <InputFiled type='password' value={payload.password} setValue={setPayload} nameKey='password' name='password' />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link className="text-sm font-medium text-main hover:underline dark:text-primary-500">
                Forgot password?
              </Link>
            </div>
            
            <Button handleOnClick={handleSubmit}>{isRegister ? 'Sign up' : 'Sign in' }</Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <span onClick={handleChaneLoginRegister} className="font-medium cursor-pointer text-main hover:underline dark:text-primary-500">
                {isRegister ? 'Sign in' : 'Sign up' }
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
