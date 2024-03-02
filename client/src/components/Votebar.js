import { memo, useEffect, useRef } from "react";
import icons from "../ultils/icons";
const {FaStar} = icons

const Votebar = ({number, ratingCount, ratingTotal}) => {

    const percentRef =  useRef()
    useEffect(()=>{
        percentRef.current.style.cssText = `right:${100 - Math.round(ratingCount * 100 / ratingTotal)||0}%`
    },[ratingCount,ratingTotal])
    return ( <div className="flex items-center gap-5 text-sm">
        <div className="w-[5%] flex justify-between items-center gap-2">
            <span>{number}</span>
            <FaStar color="orange"/>
        </div>
        <div className="flex-1 relative rounded-full bg-slate-400 h-2 overflow-hidden">
            <div ref={percentRef} className={`absolute inset-0 bg-red-500`}></div>
        </div>
        <div className="flex items-center text-center justify-center">
            {ratingCount || 0} reviewers
        </div>
    </div> );
}
 
export default memo(Votebar);