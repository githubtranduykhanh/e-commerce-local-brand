import Slider from "react-slick";
import {Cart} from './'
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const CustomSlider = ({products,activedTab,hCart,normal}) => {
    return ( 
        <>
        {products && <Slider {...settings} className="product-cart">
                    {products?.map(el => (
                        <Cart normal={normal} key={`best-seller-cart-${el._id}`} pid={el._id} productData={el} isNew={activedTab === 0 ? false : true} h={hCart}/>
                    ))}
            </Slider>
        }
        </> 
    );
}

export default CustomSlider;