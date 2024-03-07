import { useParams } from "react-router-dom";
import { Breadcrumbs, Cart, InputSelect, Pagination, SearchItem } from "../../components";
import { apiGetProduct } from "../../apis";
import { useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import icons from "../../ultils/icons";
import { sortSelectList } from "../../ultils/contants";
const { FaChevronDown } = icons;
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const CollectionsCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [params, setParams] = useState({});
  const [activeSearchItem, setActiveSearchItem] = useState(null);
  const fetchApiCollectionsCategory = async (querys) => {
    const res = await apiGetProduct(querys);
    if (res?.success) {
      if(params?.page && res?.counts < (+params?.page - 1)  * 10){
        setParams(prve => ({...prve,page:1}))
      }
      setProducts(res)
    };
  };
  const handleActiveSearchItem = useCallback(
    (name) => {
      if (name === activeSearchItem) setActiveSearchItem(null);
      else setActiveSearchItem(name);
    },
    [activeSearchItem]
  );

  const handleOnChangeSelect = useCallback( async (e)=> {
    if(category){
      const res = await apiGetProduct({sort:e.target.value,category})
      if(res?.success) setProducts(res);
    }else{
      const res = await apiGetProduct({sort:e.target.value})
      if(res?.success) setProducts(res);
    }
  },[category])

  useEffect(() => { 
      if (params?.price && typeof params?.price === "string") {
        const price = params?.price?.split("-");
        if (price[0] !== "0" || price[1] !== "0") {
          let queryPrice = {};
          if (price[0] !== "0") queryPrice = { ...queryPrice, gte: price[0] };
          if (price[1] !== "0") queryPrice = { ...queryPrice, lte: price[1] };
          params.price = queryPrice;
        }
      }
      //fetchApiCollectionsCategory()
      console.log('params',params)
      fetchApiCollectionsCategory(category ? {...params,category} : params);
  }, [params, category]);
  console.log(products)
  return (
    <div className="text-[#505050] text-[14px] leading-[20.3px] ">
      <h1 className="text-lg mb-[10px] font-semibold uppercase">{category}</h1>
      <Breadcrumbs category={category||'collections'} />
      <div className="h-[108px] border-solid border-[1px] border-[#e5e5e5] mb-[15px] mt-[15px] p-[10px] flex justify-between items-center">
        <div className="flex-1 flex flex-wrap">
          <p className=" w-full font-[600] mb-[10px]">Filter by</p>
          <div className="gap-2 flex flex-wrap">
            <SearchItem
              active={activeSearchItem}
              handleOnClick={handleActiveSearchItem}
              name={"Price"}
              height={45}
              type="input"
              setParams={setParams}
              icon={<FaChevronDown color="#505050" />}
            />
            <SearchItem
              active={activeSearchItem}
              handleOnClick={handleActiveSearchItem}
              name={"Capacity"}
              height={45}
              setParams={setParams}
              icon={<FaChevronDown color="#505050" />}
            />
          </div>
        </div>
        <div className="">
          <p className=" w-full font-[600] mb-[10px]">Sort by</p>
          <InputSelect listSelect={sortSelectList} onChangeSelect={handleOnChangeSelect}/>
        </div>
      </div>
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products &&
            products?.productDatas?.map((el) => (
              <Cart
                key={`CollectionsCategory-Cart-${el?._id}`}
                normal={true}
                productData={el}
                h={357}
              />
            ))}
        </Masonry>
      </div>
      <div className='mt-2 mb-2'>
        <Pagination onClickItem={setParams} currentPage={params?.page} totalCount={products?.counts}/>
      </div>
    </div>
  );
};

export default CollectionsCategory;
