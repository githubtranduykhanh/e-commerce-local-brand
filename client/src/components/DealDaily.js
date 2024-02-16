import { useEffect, useState,memo } from "react";
import icons from "../ultils/icons";
import {apiGetProduct} from '../apis'
import {formatMoney,renderStarFromNumber,secondsToHms} from '../ultils/helpers'
import {Countdown} from '../components'
import moment from 'moment'

const {FaStar,IoMenu} = icons
let idInterval

const DealDaily = () => {

    const [dealDaily,setDealDaily] = useState(null)
    const [hours,setHours] = useState(0)
    const [minutes,setMinutes] = useState(0)
    const [seconds,setSeconds] = useState(0)
    const [expireTime,setExpireTime] = useState(false)
    const fetchApi = async () => {
        const res = await apiGetProduct({limit:1,page: Math.round(Math.random() * 10),totalRatings:4})
        if(res?.success) {
            setDealDaily(res?.productDatas[0])

            const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            console.log(seconds)
            const number = secondsToHms(seconds)
            setHours(number.h)
            setMinutes(number.m)
            setSeconds(number.s)
            
        }else{
            setHours(0)
            setMinutes(59)
            setSeconds(59)
        } 
        
    }
    useEffect(()=>{ 
        idInterval && clearInterval(idInterval)
        fetchApi()     
    },[expireTime])
    useEffect(()=>{
        idInterval = setInterval(() => {
           if(seconds > 0) setSeconds(prev => prev-1)
           else {
                if(minutes > 0){
                    setMinutes(prev => prev-1)
                    setSeconds(59)
                }else{
                    if(hours > 0){
                        setHours(prev => prev-1)
                        setMinutes(59)
                        setSeconds(59)
                    }else{
                        setExpireTime(prev => !prev)
                    }
                }     
           }
        }, 1000);
        return () => {
            clearInterval(idInterval)
        }      
    },[hours,minutes,seconds,expireTime])

    return (  
        <div className="w-full border flex-auto">
            <div className="flex items-center justify-between p-4 w-full"> 
                <span className="flex-1 flex justify-center"><FaStar  color="#d11" size={20}/></span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">DAILY DEALS</span>
                <span className="flex-1"></span>
            </div>
            {dealDaily && <div className="flex flex-col items-center pt-8 px-4 gap-2">
                <img src={dealDaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt={dealDaily?.title} className="w-full object-contain"/>
                
                <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealDaily?.totalRatings,20)}</span>
                <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
            </div>}
            <div className="px-4 mt-8">
                <div className="flex gap-2 items-center justify-center w-full mb-4">
                    <Countdown unit={'Hours'} number={hours}/>
                    <Countdown unit={'Minutes'} number={minutes}/>
                    <Countdown unit={'Seconds'} number={seconds}/>
                </div>
                <button className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2' type='button'>
                    <IoMenu/>
                    <span>Option</span>
                </button>
            </div>

        </div>
    );
}

export default memo(DealDaily);