import { useSelector } from "react-redux";
import Slider from "react-slick";
import icons from "../ultils/icons";
import { useDispatch } from "react-redux";
import { closeModalDetail } from "../redux/features/app/appSlice";
import { useEffect, useState,memo } from "react";
import { formatPrice } from "../ultils/helpers";
const {IoMdClose} = icons
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const ModalDetail = () => {
    const dispatch = useDispatch()
    
    const {isModalDetail,detail} = useSelector(state => state.app)
    
    const [image,setImage] = useState(detail?.thumb || '')
    const [quantity,setQuantity] = useState(1)
    const handleImage = (el) => {
        setImage(el)
    }
    const handleInput = (e) => {
        if(!Number(e.target.value) && e.target.value !== '') return
        else {
            setQuantity(e.target.value)
        }
    }
   
    useEffect(()=>{
        if(isModalDetail) setImage(detail?.images[0] || detail?.thumb)
    },[isModalDetail,detail])

    return (<>
        {isModalDetail && <div className="z-[1000] fixed top-0 right-0 left-0 bottom-0 bg-[#ffffff90] flex">
        <div className="m-auto flex justify-center items-center w-[1000px] h-[600px] p-4 bg-white rounded-[20px] shadow-2xl border relative animate-slide-top">
            <IoMdClose color='#ee3131' size={26} className="close hover:animate-rotate-center" onClick={()=> dispatch(closeModalDetail())}></IoMdClose>
            <div className="flex flex-col gap-3 px-[10px] h-full">
                <img src={image} alt="image" className="w-[400px] h-[300px] object-contain flex-1"/>
                <div>
                    <Slider {...settings} className="w-[400px] h-[150px] image-detail-slider">
                    {detail && detail?.images?.length > 0 && detail?.images?.map((el) => (
                        <img onClick={()=>handleImage(el)} key={`ModalDetail-detail-image-${el}`} src={el} alt="image" className="w-[100px] h-[150px] px-3 cursor-pointer object-contain"/>
                    ))}
                    </Slider>
                    
                </div>
            </div>
            <div className="flex-1 flex flex-col border-l border-l-black h-full p-5">
                <h3 className="text-lg font-bold uppercase mb-3 tracking-[4px]">{detail?.title}</h3>
                <ul className="mb-3">
                    {detail?.description?.length > 0 && detail?.description?.map(el => (
                        <li className="text-sm mb-1" key={`ModalDetail-description-${el}`}>{el}</li>
                    ))}
                </ul>
                <span className="font-bold tracking-[2px]">{formatPrice(detail?.price)}</span>
                <div className="flex gap-3 items-center mt-4">
                    <span>Quantity</span>
                    <div className="rounded shadow-lg border py-2 ">
                        <span onClick={() => setQuantity(prve => +prve === 1 || +prve == '' ? 1 : +prve - 1 )} className="p-3 cursor-pointer">-</span>
                        <input onChange={handleInput} type="text" value={quantity} className="w-[60px] border-l border-black border-r outline-none text-center"></input>
                        <span onClick={() => setQuantity(prve => +prve + 1 )} className="p-3 cursor-pointer">+</span>
                    </div>
                </div>
                <div  className="flex-1 flex flex-col justify-end">
                    <button 
                        className="w-full button p-4 border rounded-[10px]"
                    >Add Cart</button>
                </div>
              
            </div>
            
        </div>
        </div> }
    </>
    );
}
 
export default memo(ModalDetail);