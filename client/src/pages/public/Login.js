import { Link,useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import path from "../../ultils/path";
import logo from "../../assets/logo.png";
import { Button, InputFiled, Loading, Modal } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { apiRegister,apiLogin, apiForgotPassword } from "../../apis";
import {toast } from 'react-toastify';
import {login} from '../../redux/features/user/userSlice'


const Login = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const location = useLocation()
    const [isRegister,setIsRegister] = useState(false)
    const [isForgotPassword,setIsForgotPassword] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [emailForgot,setEmailForgot] = useState({
      emailforgotpassword:'',
    })
    const [payload,setPayload] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        mobile:'',
    })
    const resetPayload = () => {
        setPayload({
          email:'',
          password:'',
          firstname:'',
          lastname:'',
          mobile:''
      })
      
    }
    const handleSubmitForotPassword = useCallback( async ()=>{
        if(emailForgot && emailForgot?.emailforgotpassword === '') toast.error('Missing input !')
        else{
          setIsLoading(true)
          const res = await apiForgotPassword({email:emailForgot?.emailforgotpassword})
          if(res?.success) {
            toast.success(res?.mes)
            setIsForgotPassword(false)
            setEmailForgot({emailforgotpassword:''})
          }
          else toast.error(res?.mes)
        }
        
    },[emailForgot])
    const handleCloseModal = useCallback(()=>{
      setIsForgotPassword(false)
    },[])
    const handleSubmit = useCallback( async () => {
        const {firstname,lastname,mobile,...data} = payload
        if(isRegister){
            setIsLoading(true)
            const res = await apiRegister(payload)
            if(res?.sucess) {
              toast.success(res?.mes,{
                position: "top-center"
              })
              resetPayload()
            }else{
              toast.error(res?.mes)
            }
        }else{
            setIsLoading(true)
            const res = await apiLogin(data)
            if(res?.sucess){
              toast.success("Success Notification !")
              resetPayload()
              dispath(login({isLogin:true,accessToken:res?.accessToken,userData:res?.userData}))
              navigate(`/${path.HOME}`)
            }else toast.error(res?.mes)
        } 
    },[payload,isRegister,dispath,navigate])
    const handleChaneLoginRegister = () => {
        resetPayload()
        setIsRegister(prev => !prev)
    }
    useEffect(()=>{
      if(location  && location.state){
        console.log('location',location)
        if(location.state.status === 'success') toast.success("Register is success !")
        if(location.state.status === 'failed') toast.error("Register is error !")
        if(location.state.status === 'failedcookies') toast.error("Register is error failed cookies !")
      }
    },[location])
    useEffect(() => {
      let timeout = setTimeout(()=>{
          setIsLoading(false)
      },5000)

      return () => {
        clearTimeout(timeout)
      }
    },[isLoading])
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
              <button onClick={() => setIsForgotPassword(true)} className="text-sm font-medium text-main hover:underline dark:text-primary-500">
                Forgot password?
              </button>
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
      {isLoading && <Loading/>}
      {isForgotPassword && <Modal 
        onCloseModal={handleCloseModal} 
        iconCloseColer={'black'}
        className="w-[700px] h-[200px] rounded-[20px] flex justify-center items-center">
        <div className="m-[50px] w-full">
              <div>
                <label
                  htmlFor="forgotpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email forgot password
                </label>
                <div className="flex items-center gap-5">
                  <div className="flex-1">
                    <InputFiled type='email' value={emailForgot.emailforgotpassword} setValue={setEmailForgot} nameKey='emailforgotpassword' name='emailforgotpassword' />
                  </div>
                  

                  
                  <Button handleOnClick={handleSubmitForotPassword} styles='w-[200px] text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Submit</Button>
                </div>
                
              </div>
              
        </div>
        </Modal>}
    </div>
  );
};

export default Login;
