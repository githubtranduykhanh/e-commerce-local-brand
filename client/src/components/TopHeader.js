import { memo } from "react";
const TopHeader = () => {
    return ( <div className="w-full h-[38px] bg-main flex justify-center items-center">
        <div className='w-main flex items-center justify-between text-xs text-white'>
            <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            <span>WELCOME TO DIGITAL WORLD</span>
        </div>
    </div> 
    );
}
 
export default memo(TopHeader);