import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {apiResetpassword} from '../../apis'
import { toast } from "react-toastify";
import path from "../../ultils/path";
import logo from '../../assets/logo.png'
import LoadingCustum from "../../components/LoadingCustum";

const ResetPassword = () => {
    const navigate = useNavigate()
    const {resettoken} =  useParams()
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const handleSubmit = async () => {
        setIsLoading(true)
        if(!resettoken || !password) toast.error('Missing input !!')
        else{
            const res = await apiResetpassword({password,token:resettoken})
            if(res?.success) {
                toast.success(res?.mes)
                navigate(`/${path.LOGIN}`)
            }else{
                toast.error(res?.mes)
            }
        }
    }
    return ( 
        <div className="w-full h-screen flex">
            <div className="m-auto shadow-2xl  w-[500px] h-[400px] rounded-[20px] p-[100px] text-center">
            <Link
                to={`/${path.HOME}`}
                className="justify-center mb-14 w-full flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                >
                <img className="object-contain" src={logo} alt="logo" />
                </Link>
                <label
                    htmlFor="password"
                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    A new password
                </label>
                <input  
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password...." 
                    type="password" 
                    value={password} 
                    className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
                <button 
                    onClick={handleSubmit}
                    className="w-[200px] text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >Send</button>
            </div>
            <LoadingCustum isLoading={isLoading} setLoading={setIsLoading}/>
        </div>
        
     );
}
 
export default ResetPassword;