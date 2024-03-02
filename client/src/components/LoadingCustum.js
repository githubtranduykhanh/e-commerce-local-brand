import { useEffect } from "react";
import { memo } from "react";



const LoadingCustum = ({isLoading,setLoading,dateTimeout}) => {
    
    useEffect(()=>{
        let timeout
        if(isLoading) {         
            timeout = setTimeout(() => { 
                setLoading(false)
            },dateTimeout || 5000)
        }
        return () => {
            clearTimeout(timeout)
        }
    },[isLoading,setLoading])
    return (<>
            {isLoading && <div className="modal-bg">
                        <div className="center-of-screen">
                            <div className="jelly-triangle">
                                <div className="jelly-triangle__dot"></div>
                                <div className="jelly-triangle__traveler"></div>
                            </div>
                            <svg width="0" height="0" className="jelly-maker">
                                <defs>
                                    <filter id="uib-jelly-triangle-ooze">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="7.3" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 00 1 0 0 00 0 1 0 00 0 0 18 -7" result="ooze" />
                                    <feBlend in="SourceGraphic" in2="ooze" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div> 
            }
        </>       
)}
 
export default memo(LoadingCustum);