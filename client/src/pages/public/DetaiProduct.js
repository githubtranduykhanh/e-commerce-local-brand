import { useParams } from "react-router-dom";
import { Breadcrumbs,CustomSlider,ProductExtraInfoItem, ProductInfomation } from "../../components";
import { useEffect } from "react";
import { apiGetProduct, apiGetProductByid } from "../../apis";
import { useState } from "react";
import Slider from "react-slick";
import { formatPrice, renderStarFromNumber } from "../../ultils/helpers";
import ReactImageMagnify from 'react-image-magnify';
import { productExtraInfoItem } from "../../ultils/contants";
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const DetaiProduct = () => {
    const {pid,title,category} = useParams()
    const [detail,setDetail] = useState(null)
    const [relatedProducts,setRelatedProducts] = useState(null)
    const [imageDetaiProduct,setImageDetaiProduct] = useState('')
    const [quantityDetaiProduct,setQuantityDetaiProduct] = useState(1)
    const apiGetDetai = async () => {
        const res = await apiGetProductByid(pid)
        if(res?.success){
            setDetail(res?.productData)  
            setImageDetaiProduct(res?.productData?.thumb)
            apiGetProductByCategory(res?.productData?.category)
        } 
        
    }
    const apiGetProductByCategory = async (category) => {
        const res = await apiGetProduct({category})
        if(res?.success){
            setRelatedProducts(res?.productDatas)
        } 
        
    }
    const handleImageDetaiProduct = (el) => {
        setImageDetaiProduct(el)
    }
    const handleInputDetaiProduct = (e) => {
        if(!Number(e.target.value) && e.target.value !== '') return
        else {
            setQuantityDetaiProduct(e.target.value)
        }
    }
    useEffect(()=>{
        apiGetDetai()
    },[])
    if(!detail) return <div>Not Found</div>
    else if(detail?.title !== title) return <div>Can not {title}</div>
    else if(detail?.category?.toLowerCase() !== category) return <div>Can not {category}</div>
    return (<div>
            <h1 className="text-lg mb-[10px] font-semibold">{detail?.title}</h1>
            <Breadcrumbs category={detail?.category} title={detail?.title}/>
            <div className="flex max-h-[700px]">
                <div className="flex-2  flex flex-col justify-center items-center gap-3"> 
                    <div className="w-[458px]  h-[458px]">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: imageDetaiProduct
                            },
                            largeImage: {
                                src: imageDetaiProduct,
                                width: 1000,
                                height: 1000
                            }
                        }}  />
                    </div>
                    
                    <Slider {...settings} className="w-[458px] h-[150px] image-detail-slider">
                        {detail && detail?.images?.length > 0 && detail?.images?.map((el) => (
                            <img onClick={()=>handleImageDetaiProduct(el)} key={`DetaiProduct-detail-image-${el}`} src={el} alt="image" className="w-[100px] h-[150px] px-3 cursor-pointer object-contain"/>
                        ))}
                    </Slider>
                </div>
                <div className="flex-2 flex flex-col"> 
                    <span className="font-bold text-2xl text-[#333] tracking-[2px] block mb-[20px]">{formatPrice(detail?.price)}</span>
                    <span className='flex h-2'>{renderStarFromNumber(detail?.totalRatings)}</span>
                    <ul className="mb-[10px] mt-[20px] text-[#505050] list-square ml-[15px]">
                    {detail?.description?.length > 0 && detail?.description?.map(el => (
                        <li className="text-sm mb-[4px]" key={`ModalDetail-description-${el}`}>{el}</li>
                    ))}
                    </ul>  
                    <div className="flex gap-3 items-center mt-4">
                        <span>Quantity</span>
                        <div className="rounded shadow-lg border py-2 ">
                            <span onClick={() => setQuantityDetaiProduct(prve => +prve === 1 || +prve == '' ? 1 : +prve - 1 )} className="p-3 cursor-pointer">-</span>
                            <input onChange={handleInputDetaiProduct} type="text" value={quantityDetaiProduct} className="w-[60px] border-l border-black border-r outline-none text-center"></input>
                            <span onClick={() => setQuantityDetaiProduct(prve => +prve + 1 )} className="p-3 cursor-pointer">+</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-end">
                    <button 
                            className="button p-4 border rounded-[10px] w-full"
                        >Add Cart</button> 
                    </div>
                    
                </div>
                <div className="flex-1"> 
                    {productExtraInfoItem?.map(el => (
                        <ProductExtraInfoItem title={el.title} sub={el.sub} icon={el.icon} key={`DetaiProduct-ProductExtraInfoItem-${el.id}` }/>
                    ))}
                </div>
            </div>
            <div className="mt-[30px] text-[#505050] leading-[20.3px] text-[14px]">
                <ProductInfomation/>
            </div>   
            <h3 className="text-[20px] mb-[50px] font-semibold py-[15px] border-b-2 border-main">OTHER CUSTOMERS ALSO BUY:</h3>
            <div className="mb-[100px]">
                <CustomSlider normal={true} products={relatedProducts} hCart={400}/>  
            </div>         
        </div> 
    );
}
 
export default DetaiProduct;