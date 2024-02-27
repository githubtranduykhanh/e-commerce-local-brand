import { useEffect, useState } from "react";
import { tabsProductInfomation } from "../ultils/contants";



let timeout
const ProductInfomation = () => {

    const [active, setActive] =  useState(0)
    const [opacity, setOpacity] =  useState('')
    const handleActive = (id) => {
        setActive(id)
        setOpacity('animate-opacity-show')
        timeout = setTimeout(() => {
            setOpacity('')
        },[600])
    }
    useEffect(()=> {
        return () => {
            console.log('clearTimeout')
            clearTimeout(timeout)
        }
    },[])
    return ( <div>
        <div className="flex justify-start gap-2">
        {tabsProductInfomation.map(el=>(
            <div
                onClick={()=>handleActive(el.id)}
                key={`ProductInfomation-Tabs-${el.id}`} 
                className={`${active === el.id ? 'bg-white text-black' : ''} cursor-pointer bg-[#f1f1f1] text-[15px] uppercase py-[9px] px-[20px] border-solid border-[1px] border-[#ebebeb]`}>
                {el.name}
            </div>
        ))}
        </div>
        <div className="mt-[-1px] p-[20px]">
           {tabsProductInfomation.some(el=>el.id === active) && <div className={opacity}>{tabsProductInfomation[active]?.content}</div>}
        </div>
        
    </div> );
}
 
export default ProductInfomation;