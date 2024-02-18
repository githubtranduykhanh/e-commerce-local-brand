import { useEffect, useState } from "react";
import { apiGetProduct } from "../apis";
import { bestseller as navBestSeller } from "../ultils/contants";
import {CustomSlider} from '../components'
import * as action from '../redux/features/products/productActions'
import { useDispatch,useSelector } from "react-redux";

const BestSeller = () => {
    
    const [bestSeller,setBestSeller] = useState([])
    
    const [products,setProducts] = useState([])
    const [activedTab,setActivedTab] = useState(null)
    const dispatch = useDispatch()
    const {newProduct} = useSelector(state => state.products)

    const  fethApi = async () => {
        const res =  await apiGetProduct({sort:'-sold'})
        if(res.success) setBestSeller(res.productDatas)
        setActivedTab(0)
    }
    useEffect(() => {
        fethApi()
        dispatch(action.getNewProducts())
    },[])
    useEffect(() => {
        if(activedTab === 0){
            setProducts(bestSeller)
        }else{
            setProducts(newProduct)
        } 
    },[activedTab])
    return (  
        <div>
            <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
                {navBestSeller?.map(el => (
                    <span key={`best-seller-${el.id}`}
                     className={`font-semibold uppercase border-r pr-7 cursor-pointer  ${activedTab === el.id ? 'text-gray-900' : 'text-gray-400'} `}
                     onClick={() => setActivedTab(el.id)}
                     >{el.name}</span>
                ))}
                
            </div>
            <div className="mt-4 mx-[-10px]">
                <CustomSlider products={products} activedTab={activedTab}/>
            </div>
            <div className="flex w-full gap-4 mt-4">
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="banner-left" className="flex-1 object-contain"/>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="banner-left" className="flex-1 object-contain"/>
            </div>
        </div>
    );
}

export default BestSeller;