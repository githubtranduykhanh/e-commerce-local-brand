
import { renderStarFromNumber,formatMoney } from "../../ultils/helpers";
const ProductCard = ({product}) => {
    return (  
        <div className="w-1/3 flex-auto  px-[10px] mb-[20px]">
            <div className="flex border w-full">
                <img src={product?.thumb} alt="product" className="w-[100px] object-contain p-4" />
                <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
                        <span className="line-clamp-1 capitalize text-sm">{product?.title?.toLowerCase()}</span>
                        <span className='flex h-4'>{renderStarFromNumber(product?.totalRatings,14)}</span>
                        <span>{`${formatMoney(product?.price)} VND`}</span>
                </div>
            </div>
            
        </div>
    );
}

export default ProductCard;