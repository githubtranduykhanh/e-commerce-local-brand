import { useEffect, useState } from "react";
import { apiGetProduct } from "../apis";
import { bestseller as navBestSeller } from "../ultils/contants";
import {Cart} from '../components'
import Slider from "react-slick";
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const BestSeller = () => {
    
    const [bestSeller,setBestSeller] = useState([])
    const [newProduct,setNewProduct] = useState([])
    const [products,setProducts] = useState([])
    const [activedTab,setActivedTab] = useState(null)

    const  fethApi = async () => {
        const res =  await Promise.all([apiGetProduct({sort:'-sold'}),apiGetProduct({sort:'-createAt'})])
        console.log(res)
        if(res[0].success) setBestSeller(res[0].productDatas)
        if(res[1].success) setNewProduct(res[1].productDatas)
        setActivedTab(0)
    }
    useEffect(() => {
        fethApi()
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
                     className={`font-semibold capitalize border-r pr-7 cursor-pointer  ${activedTab === el.id ? 'text-gray-900' : 'text-gray-400'} `}
                     onClick={() => setActivedTab(el.id)}
                     >{el.name}</span>
                ))}
                
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {products?.map(el => (
                        <Cart key={`bestSeller-${el._id}`} productData={el} isNew={activedTab === 0 ? false : true}/>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default BestSeller;