import {Sidebar,Banner,BestSeller,DealDaily,FeaturedProducts,CustomSlider,HotCollections} from '../../components'
import { useSelector } from 'react-redux';

const Home = () => {
    const {newProduct} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.app)
    console.log('categories',categories)
    return (  
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar/>
                    {/*<DealDaily/>*/}
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner/>
                    <BestSeller/>
                </div>
            </div>
            <div className='my-8'>
                <FeaturedProducts/>
            </div>
            <div className='my-8'>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">NEW ARRIVALS</h3>
                <div className='w-full my-5'>
                    <CustomSlider products={newProduct} hCart={400}/>
                </div>
            </div>
            <div className='my-8'>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">HOT COLLECTIONS</h3>
                <HotCollections categorys={categories}/>
            </div>
            <div className='my-8'>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BLOG POSTS</h3>
                
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    );
}

export default Home;