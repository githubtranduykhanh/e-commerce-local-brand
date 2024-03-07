import { useState,useEffect } from "react";
import {ProductCard} from '..'
import {apiGetProduct} from '../../apis'
const FeaturedProducts = () => {
    const [products,setProducts] = useState(null)

    const fetchProducts = async () => {
        const res = await apiGetProduct({limit:9,totalRatings:4})
        if(res.success) setProducts(res.productDatas)
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    return (  
        <div className="w-full">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">FEATURED PRODUCTS</h3>
            <div className="flex flex-wrap mt-[15px] mx-[-10px]">
                {products?.map(el => (
                    <ProductCard key={`FeaturedProducts-${el._id}`} product={el} />
                ))}
            </div>
            <div className="flex gap-5 h-[655px] ">
                <img 
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" 
                    alt="img"
                />
                <div className="flex gap-5 flex-1">
                    <div className="flex flex-col gap-5">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="img"/>
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" className="flex-1" alt="img"/>
                    </div>
                    <img className="flex-1" 
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" 
                        alt=""
                    />
                </div>

            </div>
        </div>

    );
}

export default FeaturedProducts;