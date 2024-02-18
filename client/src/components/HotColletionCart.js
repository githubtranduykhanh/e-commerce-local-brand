const HotColletionCart = ({category}) => {
    return (  
        <>
            {category && 
                <div className=" flex border w-[392px]">
                    <div className="m-auto">
                        <img src={category?.image} alt="category" className=" w-[155px] object-contain p-4" />
                    </div>
                    <div className="flex-1 text-sm p-5">
                        <h4 className="font-semibold uppercase ">{category?.title}</h4>
                        <ul>
                            {category?.brand?.map(el => (
                                <li className="text-justify my-2 hover:text-main cursor-pointer" key={`HotColletionCart-${category?.title}-${el}`}>{'> '+el}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            } 
        </>
    );
}

export default HotColletionCart;