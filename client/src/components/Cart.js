import {formatMoney,renderStarFromNumber} from '../ultils/helpers'
import label from '../assets/label.png'
import labelBlue from '../assets/label-blue.png'
import {SelecOption} from '../components'
import icons from '../ultils/icons'
import { useState } from 'react'
const {IoMenu,FaHeart,FaEye} = icons
const Cart = ({productData,isNew,pid}) => {

    const [isShowOption,setIsShowOption] = useState(false)
    return (  
        <div className="w-full text-base px-[10px]">
            <div className="w-full border p-[15px] flex flex-col items-center"
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                        <SelecOption icon={<FaHeart/>}/>
                        <SelecOption icon={<IoMenu/>}/>
                        <SelecOption icon={<FaEye/>}/>
                        </div>
                    }
                    
                    <img src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt={productData?.title} className="w-[274px] h-[274px] object-cover"/>
                    
                    {isNew
                        ? <img src={label} alt='lable' className='absolute top-[-15px] left-[-38px] w-[100px] h-[35px] object-cover' />
                        : <img src={labelBlue} alt='labelBlue' className='absolute top-[-15px] left-[-46px] w-[155px] h-[55px] object-cover' />
                    }
                    
                    {isNew
                        ? <span className='font-bold absolute top-[-15px] left-[-12px] text-white'>New</span>
                        : <span className='font-bold absolute top-[-8px] left-[-10px] text-white'>Trending</span>
                    }
                </div>
                
                
                
                <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;