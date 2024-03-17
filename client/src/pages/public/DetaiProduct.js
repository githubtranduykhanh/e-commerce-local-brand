import { useParams } from "react-router-dom";
import { Breadcrumbs,CustomSlider,ProductExtraInfoItem, ProductInfomation,LoadingCustum } from "../../components";
import { useEffect } from "react";
import { apiGetProduct, apiGetProductByid } from "../../apis";
import { useState } from "react";
import Slider from "react-slick";
import { formatPrice, renderStarFromNumber } from "../../ultils/helpers";
import ReactImageMagnify from 'react-image-magnify';
import { productExtraInfoItem } from "../../ultils/contants";
import DOMPurify from 'dompurify';
import clsx from "clsx";
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
    const [isLoading,setIsLoading] = useState(null)
    const [relatedProducts,setRelatedProducts] = useState(null)
    const [imageDetaiProduct,setImageDetaiProduct] = useState('')
    const [quantityDetaiProduct,setQuantityDetaiProduct] = useState(1)
    const [varriant,setVarriant] = useState({
        isVarriant:null,
        price:'',
        title:'',
        thumb:'',
        quantity:0,
        images:'',
        imageProduct:''
    })
    const apiGetDetai = async () => {
        const res = await apiGetProductByid(pid)
        if(res?.success){
            setDetail(res?.productData)  
            setVarriant(prve => ({...prve,isVarriant:null, title:res?.productData?.title, thumb:res?.productData?.thumb, images:res?.productData?.images, price:res?.productData?.price, imageProduct:res?.productData?.thumb, quantity:res?.productData?.quantity}))
            setImageDetaiProduct(res?.productData?.thumb)
            apiGetProductByCategory(res?.productData?.category)
        } 
    }
    const apiGetProductByCategory = async (categoryNew) => {
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
        setIsLoading(true)
        apiGetDetai()
    },[pid,title,category])
    // useEffect(()=>{
    //     setVarriant(prve => ({...prve,isVarriant:null, title:detail?.title, thumb:detail?.thumb, images:detail?.images, price:detail?.price}))
    // },[detail])
    console.log(detail)
    console.log(varriant)
    if(!detail) return <div>Not Found</div>

    else if(detail?.title !== title) return <div>Can not {title}</div>
    else if(detail?.category?.toLowerCase() !== category) return <div>Can not {category}</div>
    else if(isLoading) return (<LoadingCustum dateTimeout={700} isLoading={isLoading} setLoading={setIsLoading}/>) 
    return (<div>
            <h1 className="text-lg mb-[10px] font-semibold">{varriant?.title}</h1>
            <Breadcrumbs category={detail?.category} title={varriant?.title}/>
            <div className="flex max-h-[700px]">
                <div className="flex-2  flex flex-col justify-center items-center gap-3"> 
                    <div className="w-[458px]  h-[458px]">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: varriant?.imageProduct,
                            },
                            largeImage: {
                                src: varriant?.imageProduct,
                                width: 1000,
                                height: 1000
                            }
                        }}/>
                    </div>
                    
                    <Slider {...settings} className="w-[458px] h-[150px] image-detail-slider">
                        {/* {detail && detail?.images?.length > 0 && detail?.images?.map((el) => (
                            <img onClick={()=>handleImageDetaiProduct(el)} key={`DetaiProduct-detail-image-${el}`} src={el} alt="image" className="w-[100px] h-[150px] px-3 cursor-pointer object-contain"/>
                        ))} */}
                        {varriant && varriant.images?.length > 0 && varriant?.images?.map((el) => (
                            <img onClick={()=>setVarriant(prve => ({...prve,imageProduct:el}))} key={`DetaiProduct-detail-image-${el}`} src={el} alt="image" className="w-[100px] h-[150px] px-3 cursor-pointer object-contain"/>
                        ))}
                    </Slider>
                </div>
                <div className="flex-2 flex flex-col"> 
                    <div className="flex justify-between text-center">
                        <span className="font-bold text-2xl text-[#333] tracking-[2px] block mb-[20px]">{formatPrice(varriant?.price)}</span>
                        <span className="text-sm text-main mr-10">{`In stock: ${varriant?.quantity}`}</span>
                    </div>
                    <span className="text-sm text-main mr-10">{`Sold ${varriant?.sold || 0} pieces`}</span>
                    <span className='flex h-2'>{renderStarFromNumber(detail?.totalRatings)}</span>
                    <ul className="mb-[10px] mt-[20px] text-[#505050] list-square ml-[15px]">
                    
                    
                    {detail?.description?.length > 1 && detail?.description?.map(el => (
                        <li className="text-sm mb-[4px]" key={`ModalDetail-description-${el}`}>{el}</li>
                    ))}
                    {detail?.description?.length === 1 && <div className="text-sm" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(detail?.description[0])}}>
                    </div>}
                    </ul>  
                    <div className="flex gap-3 mt-4">
                        <span>Color</span>
                        <div className="flex flex-wrap gap-2">
                            <div onClick={()=> setVarriant(prve => ({...prve,isVarriant:null, title:detail?.title, thumb:detail?.thumb, images:detail?.images, price:detail?.price, imageProduct:detail?.thumb, quantity:detail?.quantity}))} className={clsx("flex items-center gap-2 border rounded-md h-15 p-1 cursor-pointer",!varriant?.isVarriant && 'border-black')}>
                                <img src={detail?.thumb} alt="thumb" className="w-16 h-full object-cover border rounded-md"/>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">{detail?.color}</span>
                                    <span className="text-sm">{formatPrice(detail?.price)}</span>
                                </div>                  
                            </div>
                            {detail?.varriants?.length > 0 && detail?.varriants?.map(el => 
                                (<div onClick={()=> setVarriant(prve => ({...prve,isVarriant:el?.sku, title:el?.title, thumb:el?.thumb, images:el?.images, price:el?.price, imageProduct:el?.thumb, quantity:el?.quantity}))} key={`DetaiProduct-varriants-${el?._id} `} className={clsx("flex items-center gap-2 border rounded-md h-15 p-1 cursor-pointer",varriant?.isVarriant === el?.sku && 'border-black')}>
                                    <img src={el?.thumb} alt="thumb" className="w-16 h-full object-cover border rounded-md"/>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm">{el?.color}</span>
                                        <span className="text-sm">{formatPrice(el?.price)}</span>
                                    </div>                            
                                </div>))                               
                            }
                        </div>
                    </div>
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
                <ProductInfomation productProps={detail}/>
            </div>   
            <h3 className="text-[20px] mb-[50px] font-semibold py-[15px] border-b-2 border-main">OTHER CUSTOMERS ALSO BUY:</h3>
            <div className="mb-[100px]">
                <CustomSlider normal={true} products={relatedProducts} hCart={400}/>  
            </div>   
                 
        </div> 
    );
}
 
export default DetaiProduct;