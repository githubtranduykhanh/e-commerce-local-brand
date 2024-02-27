const ProductExtraInfoItem = ({title,sub,icon}) => {
    return ( <div className="flex items-center text-[#505050] p-[10px] mb-[10px]">
        <span className="w-[37px] h-[37px] rounded-full mr-[10px] flex items-center text-white bg-[#505050] justify-center">{icon}</span>
        <div>
            <h3 className="text-[14px]">{title}</h3>
            <h4 className="text-[12px] text-[#999] leading-[18px]">{sub}</h4>
        </div>
    </div> 
    );
}
 
export default ProductExtraInfoItem;