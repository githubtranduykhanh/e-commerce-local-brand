import { useCallback, useEffect, useState } from "react";
import { tabsProductInfomation } from "../../ultils/contants";
import { memo } from "react";
import Votebar from "../Vote/Votebar";
import { renderStarFromNumber } from "../../ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { closeModalRedux, showModalRedux } from "../../redux/features/app/appSlice";
import VoteOption from "../Vote/VoteOption";
import { apiPostRatings } from "../../apis";
import { toast } from "react-toastify";
import {Comment} from '..'


let timeout
const ProductInfomation = ({productProps}) => {
    const dispatch =useDispatch()
    const {isLogin} = useSelector(state => state.user)
    const [product, setProduct] =  useState(productProps)
    const [active, setActive] =  useState(0)
    const [opacity, setOpacity] =  useState('')
    const handleActive = (id) => {
        setActive(id)
        setOpacity('animate-opacity-show')
        timeout = setTimeout(() => {
            setOpacity('')
        },[600])
    }
    const handleVoteOption = useCallback( async (comment,star,pid)=>{
        if(!star || !pid) {
            toast.warning('Missing input !!')
            return false
        }
        else{
            const res = await apiPostRatings({comment,star,pid,updateAt:Date.now()})
            if(res?.success) {
                dispatch(closeModalRedux())
                setProduct(res?.ratings)
                return true
            }else{
                toast.error('Something wrong sever !!!')
                return false
            }
        }
    },[])
    const handleVoteModal = () => {
        if(!isLogin) toast.info('Please log in :((') 
        else{
            dispatch(showModalRedux({modalReduxChildren:<VoteOption handleVoteOption={handleVoteOption} productVote={product}/>}))
        }
    }
    useEffect(()=> {
        return () => {
            clearTimeout(timeout)
        }
    },[])
    console.log(product)
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
            <div
                onClick={()=>handleActive(tabsProductInfomation.length)}
                key={`ProductInfomation-Tabs-${tabsProductInfomation.length}`} 
                className={`${active === tabsProductInfomation.length ? 'bg-white text-black' : ''} cursor-pointer bg-[#f1f1f1] text-[15px] uppercase py-[9px] px-[20px] border-solid border-[1px] border-[#ebebeb]`}>
                Customer Review
            </div>
        </div>
        <div className="mt-[-1px] p-[20px]">
           {tabsProductInfomation.some(el=>el.id === active) && <div className={opacity}>{tabsProductInfomation[active]?.content}</div>}
           {tabsProductInfomation.length === active && <div className="flex flex-col border p-4">
                <div className="flex border-b">
                    <div className="flex-4 flex justify-center flex-col items-center">
                        <span className="text-2xl font-semibold">{product?.totalRatings}/5</span>
                        <span className="flex justify-center items-center gap-1">{product?.totalRatings ? renderStarFromNumber(product?.totalRatings).map((el,index) => (
                            <span key={`ProductInfomation-renderStarFromNumber-${index}`}>{el}</span>
                        )):'...'}</span>
                        <span>{product?.ratings?.length} reviewers and commemtor</span>
                    </div>
                    <div className="flex-6 flex flex-col p-4">
                        {Array.from(Array(5).keys()).reverse().map(el => (
                            <Votebar key={`ProductInfomation-Votebar-${el}`} 
                            number={el + 1} 
                            ratingTotal={product?.ratings?.length} 
                            ratingCount={product?.ratings?.filter(item => item?.star === el + 1)?.length}/>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3 mt-4">
                    <span>Do you review this product ?</span>
                    <button 
                        onClick={handleVoteModal}
                        className="m-auto button p-4 border rounded-[10px] w-[50%]"
                        >Vote now</button> 
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {product?.ratings?.map((el,index)=>(
                        <Comment 
                            key={`Comment-ProductInfomation-${el?._id}`}
                            comment={el?.comment}
                            updateAt={el?.updateAt}
                            star={el?.star}
                            name={`${el?.postedBy?.firstname} ${el?.postedBy?.lastname}`}
                        />
                    ))}
                </div>
            </div>}
            
        </div>
        
    </div> );
}
 
export default memo(ProductInfomation);