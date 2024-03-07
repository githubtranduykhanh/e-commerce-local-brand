import { memo, useEffect, useState } from "react";
import { colorSearch } from "../../ultils/contants";
import { arrNewColor, formatPrice } from "../../ultils/helpers";
import { apiGetProduct } from "../../apis";
import { useDebounce } from "../../hooks";
import {toast} from 'react-toastify'
const SearchItem = ({name,width,height,icon,active,handleOnClick,type = 'checkbox',setParams}) => {
    const [selecteds, setSelecteds] = useState(colorSearch)
    const [price, setPrice] = useState({gte:'',lte:''})
    const debounceColorValue = useDebounce(selecteds,1000)
    const debouncePriceValue = useDebounce(price,1000)
    const [priceMax, setPriceMax] = useState(0)
    const updateCheckStatus = index => {
        setSelecteds(
            selecteds.map((selected, currentIndex) =>
                currentIndex === index
                ? { ...selected, checked: !selected?.checked }
                : selected
            )
        )
    }
    const unSelectAll = () => {
        setSelecteds(selecteds.map(selected => ({ ...selected, checked: false })))
    }

    const resetPrice = () => {
       setPrice({gte:'',lte:''})
    }


    const handlePrice = (value,typeInput) => {
        if(typeInput === 'from') setPrice({...price,gte:value})
        if(typeInput === 'to') setPrice({...price,lte:value})     
    }
   
    useEffect(()=>{
        if(type === 'checkbox') setParams(prev => arrNewColor(selecteds)  ? {...prev,color:arrNewColor(selecteds)} : delete prev?.color && {...prev})
        if(price.lte && price.gte > price.lte) {
            toast.error('From price cannot greater tian price')
            return 
        }
        if(type === 'input') setParams(prev => price.gte !== '' || price.lte !== '' ? {...prev,price:[+price.gte,+price.lte].join('-')} : delete prev?.price && {...prev})
    },[debouncePriceValue,debounceColorValue])

    const fetchApiPrice = async () => {
        const res = await apiGetProduct({sort:'-price',limit:1})
        if(res?.success) setPriceMax(res?.productDatas[0]?.price)
    }
    useEffect(()=> {
        if(type === 'input') fetchApiPrice()
    },[type])
    return ( 
        <div 
            onClick={()=>handleOnClick(name)} 
             className={`flex relative justify-between gap-9 items-center h-[${height}px] w-[${width}px] text-[#1a1b18] border border-[#1a1b188c] cursor-pointer  text-[12px] leading-[45px] pr-[10px] pl-[20px]`}>
            <span className="capitalize">{name}</span>
            {icon}
            {active === name && <div className="top-[107%]  bg-white left-[-1px] absolute border border-[#1a1b1833] w-[350px] z-50">
                {type === 'checkbox' && 
                    <div className="overflow-y-auto max-h-[55rem]">
                        <div onClick={(e)=>e.stopPropagation()} className="flex justify-between items-center py-[15px] px-[20px] border-b border-b-[##1a1b1833]">
                            <span className="whitespace-nowrap">{`${selecteds?.reduce((sum,item) => item?.checked ? sum + 1 : sum ,0)} selected`}</span>
                            <span onClick={unSelectAll} className="underline cursor-pointer hover:text-main">Reset</span>
                        </div>
                        <div onClick={(e)=>e.stopPropagation()} className="py-[5px] px-[20px]">
                            <ul className="leading-[35px] font-[500]">
                                {selecteds.map((el,index) => (
                                    <li className="flex items-center gap-2 " key={`SearchItem-colorSearch-${index}`}>
                                        <input type="checkbox" checked={el?.checked} onChange={() => updateCheckStatus(index)} id={`checkbox-${el?.name}`} name={el?.name} />
                                        <label className="cursor-pointer" htmlFor={`checkbox-${el?.name}`}>{el?.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                {type === 'input' && 
                    <div>
                        <div onClick={(e)=>e.stopPropagation()} className="flex justify-between items-center py-[15px] px-[20px] border-b border-b-[##1a1b1833]">
                            <div className="leading-[25.2px] text-[14px]">
                                <span className="whitespace-nowrap">{`The highest price is ${formatPrice(priceMax)}`}</span><br></br>
                                <span className="whitespace-nowrap">{`Default input value is USD`}</span>
                            </div>
                            <span onClick={resetPrice} className="underline cursor-pointer hover:text-main">Reset</span>
                        </div>
                        <div onClick={(e)=>e.stopPropagation()} 
                            className="flex w-full items-center gap-3 py-[15px] px-[20px] text-[14px] leading-[45px] font-[500]">
                           <div className="flex items-center gap-2">
                                <span>$</span>
                                <div className="input-focus-effect">
                                <input value={price.gte} onChange={e => handlePrice(e.target.value,'from')} type="number" min='0' className="font-[700] tracking-[1.6px] leading-[25.0081px] uppercase" placeholder=" " />
                                <label>From</label>
                                </div>
                           </div>
                           <div className="flex items-center gap-2">
                                <span>$</span>
                                <div className="input-focus-effect">
                                <input value={price.lte} onChange={e => handlePrice(e.target.value,'to')} type="number" min='0' className="font-[700] tracking-[1.6px] leading-[25.0081px] uppercase" placeholder=" " />
                                <label>To</label>
                                </div>
                           </div>
                        </div>
                    </div>
                }
            </div>}
        </div>
     );
}
 
export default memo(SearchItem);